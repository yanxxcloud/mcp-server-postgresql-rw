#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { Pool, QueryResult } from "pg";

interface Config {
  connectionString?: string;
  host?: string;
  port?: number;
  database?: string;
  user?: string;
  password?: string;
  ssl?: boolean;
}

class PostgreSQLServer {
  private server: Server;
  private pool: Pool | null = null;

  constructor() {
    this.server = new Server(
      {
        name: "postgresql-server-rw",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupHandlers();
  }

  private getConnectionConfig(): Config {
    const connectionString = process.env.POSTGRES_CONNECTION_STRING;
    if (connectionString) {
      return { connectionString };
    }

    return {
      host: process.env.POSTGRES_HOST || "localhost",
      port: parseInt(process.env.POSTGRES_PORT || "5432", 10),
      database: process.env.POSTGRES_DATABASE || "postgres",
      user: process.env.POSTGRES_USER || "postgres",
      password: process.env.POSTGRES_PASSWORD || "",
      ssl: process.env.POSTGRES_SSL === "true",
    };
  }

  private async getPool(): Promise<Pool> {
    if (!this.pool) {
      const config = this.getConnectionConfig();
      this.pool = new Pool(config);
    }
    return this.pool;
  }

  private async executeQuery(
    query: string,
    params?: any[]
  ): Promise<QueryResult> {
    const pool = await this.getPool();
    try {
      return await pool.query(query, params);
    } catch (error: any) {
      throw new Error(`数据库查询错误: ${error.message}`);
    }
  }

  private setupHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: "query",
            description:
              "执行 SELECT 查询语句，返回查询结果。用于读取数据。",
            inputSchema: {
              type: "object",
              properties: {
                sql: {
                  type: "string",
                  description: "要执行的 SELECT SQL 查询语句",
                },
              },
              required: ["sql"],
            },
          },
          {
            name: "insert",
            description: "执行 INSERT 语句，向表中插入新数据。",
            inputSchema: {
              type: "object",
              properties: {
                sql: {
                  type: "string",
                  description: "要执行的 INSERT SQL 语句",
                },
              },
              required: ["sql"],
            },
          },
          {
            name: "update",
            description: "执行 UPDATE 语句，更新表中的数据。",
            inputSchema: {
              type: "object",
              properties: {
                sql: {
                  type: "string",
                  description: "要执行的 UPDATE SQL 语句",
                },
              },
              required: ["sql"],
            },
          },
          {
            name: "delete",
            description: "执行 DELETE 语句，从表中删除数据。",
            inputSchema: {
              type: "object",
              properties: {
                sql: {
                  type: "string",
                  description: "要执行的 DELETE SQL 语句",
                },
              },
              required: ["sql"],
            },
          },
          {
            name: "execute_ddl",
            description:
              "执行 DDL（数据定义语言）语句，包括 CREATE、ALTER、DROP 等操作。用于创建、修改或删除数据库对象（表、索引、视图等）。",
            inputSchema: {
              type: "object",
              properties: {
                sql: {
                  type: "string",
                  description: "要执行的 DDL SQL 语句（CREATE、ALTER、DROP 等）",
                },
              },
              required: ["sql"],
            },
          },
          {
            name: "execute",
            description:
              "执行任意 SQL 语句（查询、DML 或 DDL）。这是一个通用工具，可以执行任何 SQL 操作。",
            inputSchema: {
              type: "object",
              properties: {
                sql: {
                  type: "string",
                  description: "要执行的 SQL 语句",
                },
              },
              required: ["sql"],
            },
          },
        ] as Tool[],
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      if (!args || typeof args !== "object") {
        throw new Error("参数必须是对象");
      }

      const sql = (args as any).sql;
      if (!sql || typeof sql !== "string") {
        throw new Error("必须提供 sql 参数");
      }

      try {
        switch (name) {
          case "query": {
            // 验证是否为 SELECT 查询
            const trimmedSql = sql.trim().toUpperCase();
            if (!trimmedSql.startsWith("SELECT")) {
              throw new Error("query 工具只能执行 SELECT 查询语句");
            }
            const result = await this.executeQuery(sql);
            return {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(
                    {
                      rows: result.rows,
                      rowCount: result.rowCount,
                      fields: result.fields.map((f) => ({
                        name: f.name,
                        dataTypeID: f.dataTypeID,
                      })),
                    },
                    null,
                    2
                  ),
                },
              ],
            };
          }

          case "insert": {
            const trimmedSql = sql.trim().toUpperCase();
            if (!trimmedSql.startsWith("INSERT")) {
              throw new Error("insert 工具只能执行 INSERT 语句");
            }
            const result = await this.executeQuery(sql);
            return {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(
                    {
                      success: true,
                      rowCount: result.rowCount,
                      message: `成功插入 ${result.rowCount} 行数据`,
                    },
                    null,
                    2
                  ),
                },
              ],
            };
          }

          case "update": {
            const trimmedSql = sql.trim().toUpperCase();
            if (!trimmedSql.startsWith("UPDATE")) {
              throw new Error("update 工具只能执行 UPDATE 语句");
            }
            const result = await this.executeQuery(sql);
            return {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(
                    {
                      success: true,
                      rowCount: result.rowCount,
                      message: `成功更新 ${result.rowCount} 行数据`,
                    },
                    null,
                    2
                  ),
                },
              ],
            };
          }

          case "delete": {
            const trimmedSql = sql.trim().toUpperCase();
            if (!trimmedSql.startsWith("DELETE")) {
              throw new Error("delete 工具只能执行 DELETE 语句");
            }
            const result = await this.executeQuery(sql);
            return {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(
                    {
                      success: true,
                      rowCount: result.rowCount,
                      message: `成功删除 ${result.rowCount} 行数据`,
                    },
                    null,
                    2
                  ),
                },
              ],
            };
          }

          case "execute_ddl": {
            const trimmedSql = sql.trim().toUpperCase();
            const ddlKeywords = [
              "CREATE",
              "ALTER",
              "DROP",
              "TRUNCATE",
              "COMMENT",
              "GRANT",
              "REVOKE",
            ];
            const isDDL = ddlKeywords.some((keyword) =>
              trimmedSql.startsWith(keyword)
            );
            if (!isDDL) {
              throw new Error(
                "execute_ddl 工具只能执行 DDL 语句（CREATE、ALTER、DROP 等）"
              );
            }
            const result = await this.executeQuery(sql);
            return {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(
                    {
                      success: true,
                      message: "DDL 语句执行成功",
                      command: result.command,
                    },
                    null,
                    2
                  ),
                },
              ],
            };
          }

          case "execute": {
            // 通用执行工具，可以执行任何 SQL
            const result = await this.executeQuery(sql);
            const isQuery = sql.trim().toUpperCase().startsWith("SELECT");
            return {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(
                    {
                      success: true,
                      rowCount: result.rowCount,
                      command: result.command,
                      ...(isQuery && {
                        rows: result.rows,
                        fields: result.fields.map((f) => ({
                          name: f.name,
                          dataTypeID: f.dataTypeID,
                        })),
                      }),
                    },
                    null,
                    2
                  ),
                },
              ],
            };
          }

          default:
            throw new Error(`未知的工具: ${name}`);
        }
      } catch (error: any) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  error: true,
                  message: error.message,
                },
                null,
                2
              ),
            },
          ],
          isError: true,
        };
      }
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("PostgreSQL MCP Server 已启动");
  }

  async close() {
    if (this.pool) {
      await this.pool.end();
    }
  }
}

// 启动服务器
const server = new PostgreSQLServer();
server.run().catch(console.error);

// 优雅关闭
process.on("SIGINT", async () => {
  await server.close();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await server.close();
  process.exit(0);
});

