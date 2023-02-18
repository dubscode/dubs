import { createRequire as topLevelCreateRequire } from 'module';const require = topLevelCreateRequire(import.meta.url);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/dotenv/package.json
var require_package = __commonJS({
  "node_modules/dotenv/package.json"(exports, module) {
    module.exports = {
      name: "dotenv",
      version: "16.0.3",
      description: "Loads environment variables from .env file",
      main: "lib/main.js",
      types: "lib/main.d.ts",
      exports: {
        ".": {
          require: "./lib/main.js",
          types: "./lib/main.d.ts",
          default: "./lib/main.js"
        },
        "./config": "./config.js",
        "./config.js": "./config.js",
        "./lib/env-options": "./lib/env-options.js",
        "./lib/env-options.js": "./lib/env-options.js",
        "./lib/cli-options": "./lib/cli-options.js",
        "./lib/cli-options.js": "./lib/cli-options.js",
        "./package.json": "./package.json"
      },
      scripts: {
        "dts-check": "tsc --project tests/types/tsconfig.json",
        lint: "standard",
        "lint-readme": "standard-markdown",
        pretest: "npm run lint && npm run dts-check",
        test: "tap tests/*.js --100 -Rspec",
        prerelease: "npm test",
        release: "standard-version"
      },
      repository: {
        type: "git",
        url: "git://github.com/motdotla/dotenv.git"
      },
      keywords: [
        "dotenv",
        "env",
        ".env",
        "environment",
        "variables",
        "config",
        "settings"
      ],
      readmeFilename: "README.md",
      license: "BSD-2-Clause",
      devDependencies: {
        "@types/node": "^17.0.9",
        decache: "^4.6.1",
        dtslint: "^3.7.0",
        sinon: "^12.0.1",
        standard: "^16.0.4",
        "standard-markdown": "^7.1.0",
        "standard-version": "^9.3.2",
        tap: "^15.1.6",
        tar: "^6.1.11",
        typescript: "^4.5.4"
      },
      engines: {
        node: ">=12"
      }
    };
  }
});

// node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "node_modules/dotenv/lib/main.js"(exports, module) {
    var fs = __require("fs");
    var path = __require("path");
    var os = __require("os");
    var packageJson = require_package();
    var version = packageJson.version;
    var LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    function parse(src) {
      const obj = {};
      let lines = src.toString();
      lines = lines.replace(/\r\n?/mg, "\n");
      let match;
      while ((match = LINE.exec(lines)) != null) {
        const key = match[1];
        let value = match[2] || "";
        value = value.trim();
        const maybeQuote = value[0];
        value = value.replace(/^(['"`])([\s\S]*)\1$/mg, "$2");
        if (maybeQuote === '"') {
          value = value.replace(/\\n/g, "\n");
          value = value.replace(/\\r/g, "\r");
        }
        obj[key] = value;
      }
      return obj;
    }
    __name(parse, "parse");
    function _log(message) {
      console.log(`[dotenv@${version}][DEBUG] ${message}`);
    }
    __name(_log, "_log");
    function _resolveHome(envPath) {
      return envPath[0] === "~" ? path.join(os.homedir(), envPath.slice(1)) : envPath;
    }
    __name(_resolveHome, "_resolveHome");
    function config(options) {
      let dotenvPath = path.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      const debug = Boolean(options && options.debug);
      const override = Boolean(options && options.override);
      if (options) {
        if (options.path != null) {
          dotenvPath = _resolveHome(options.path);
        }
        if (options.encoding != null) {
          encoding = options.encoding;
        }
      }
      try {
        const parsed = DotenvModule.parse(fs.readFileSync(dotenvPath, { encoding }));
        Object.keys(parsed).forEach(function(key) {
          if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
            process.env[key] = parsed[key];
          } else {
            if (override === true) {
              process.env[key] = parsed[key];
            }
            if (debug) {
              if (override === true) {
                _log(`"${key}" is already defined in \`process.env\` and WAS overwritten`);
              } else {
                _log(`"${key}" is already defined in \`process.env\` and was NOT overwritten`);
              }
            }
          }
        });
        return { parsed };
      } catch (e) {
        if (debug) {
          _log(`Failed to load ${dotenvPath} ${e.message}`);
        }
        return { error: e };
      }
    }
    __name(config, "config");
    var DotenvModule = {
      config,
      parse
    };
    module.exports.config = DotenvModule.config;
    module.exports.parse = DotenvModule.parse;
    module.exports = DotenvModule;
  }
});

// sst.config.ts
var import_dotenv = __toESM(require_main(), 1);
import findConfig from "find-config";

// stacks/api-stack.ts
import { Api, use } from "sst/constructs";

// stacks/domain-stack.ts
function DomainStack({ stack }) {
  const domainName = process.env.DOMAIN_NAME;
  if (!domainName) {
    throw new Error("Missing DOMAIN_NAME env variable in .env.local");
  }
  const DOMAIN = {
    dev: `dev.${stack.stage}.${domainName}`,
    prod: domainName,
    staging: `staging.${domainName}`
  };
  const apiDomain = DOMAIN[stack.stage] ? `api.${DOMAIN[stack.stage]}` : `api.${DOMAIN.dev}`;
  const docsDomain = DOMAIN[stack.stage] ? `docs.${DOMAIN[stack.stage]}` : `docs.${DOMAIN.dev}`;
  const domain = DOMAIN[stack.stage] ? DOMAIN[stack.stage] : DOMAIN.dev;
  const mailDomain = DOMAIN[stack.stage] ? `mail.${DOMAIN[stack.stage]}` : `mail.${DOMAIN.dev}`;
  const allowOrigins = !!process.env.IS_LOCAL ? [`https://${domain}`, `https://${apiDomain}`] : [`https://${domain}`, `https://${apiDomain}`, "http://localhost:3000"];
  stack.addOutputs({
    AllowOrigins: allowOrigins.join(","),
    ApiDomain: apiDomain,
    DocsDomain: docsDomain,
    Domain: domain,
    HostedZoneName: domainName,
    MailDomain: mailDomain
  });
  return {
    allowOrigins,
    apiDomain,
    docsDomain,
    domain,
    hostedZoneName: domainName,
    mailDomain
  };
}
__name(DomainStack, "DomainStack");

// stacks/postgres-stack.ts
import { RDS } from "sst/constructs";
function PostgresStack({ stack }) {
  const rds = new RDS(stack, "db-rds", {
    engine: "postgresql11.13",
    defaultDatabaseName: "main",
    scaling: {
      autoPause: stack.stage !== "prod",
      minCapacity: "ACU_2",
      maxCapacity: stack.stage !== "prod" ? "ACU_2" : "ACU_4"
    },
    migrations: "packages/databases/src/migrations",
    types: "packages/core/src/types/sql.generated.ts"
  });
  return rds;
}
__name(PostgresStack, "PostgresStack");

// stacks/api-stack.ts
function ApiStack({ stack }) {
  const db = use(PostgresStack);
  const { allowOrigins, apiDomain, hostedZoneName } = use(DomainStack);
  const api = new Api(stack, "api", {
    defaults: {
      function: {
        bind: [db]
      }
    },
    customDomain: {
      domainName: apiDomain,
      hostedZone: hostedZoneName
    },
    cors: {
      allowCredentials: true,
      allowHeaders: ["content-type", "authorization", "accept"],
      allowMethods: ["ANY"],
      allowOrigins
    },
    routes: {
      "POST /graphql": {
        type: "graphql",
        function: {
          handler: "packages/functions/src/graphql/server.handler"
        },
        pothos: {
          schema: "packages/functions/src/graphql/schema.ts",
          output: "graphql-output/schema.graphql",
          commands: ["npm run gql"]
        }
      },
      "GET /graphql": {
        type: "graphql",
        function: {
          handler: "packages/functions/src/graphql/server.handler"
        }
      }
    }
  });
  const url = api.customDomainUrl || api.url;
  const graphqlUrl = `${url}/graphql`;
  stack.addOutputs({
    ApiUrl: url,
    GraphqlUrl: graphqlUrl
  });
  return { api, graphqlUrl, url };
}
__name(ApiStack, "ApiStack");

// stacks/auth-stack.ts
import { Auth, use as use2 } from "sst/constructs";
var AuthStack = /* @__PURE__ */ __name(({ stack }) => {
  const { api } = use2(ApiStack);
  const { domain, mailDomain } = use2(DomainStack);
  const auth = new Auth(stack, "auth", {
    authenticator: {
      handler: "packages/functions/src/auth.handler",
      environment: {
        MAIL_DOMAIN: mailDomain,
        REDIRECT_URL: !!process.env.IS_LOCAL ? `https://${domain}` : "http://localhost:3000"
      },
      permissions: ["ses:SendEmail", "ses:SendRawEmail"]
    }
  });
  auth.attach(stack, {
    api,
    prefix: "/auth"
  });
  return auth;
}, "AuthStack");

// stacks/frontend-stack.ts
import { StaticSite, dependsOn, use as use3 } from "sst/constructs";
function FrontendStack({ stack }) {
  dependsOn(ApiStack);
  const { graphqlUrl, url } = use3(ApiStack);
  const { domain, hostedZoneName } = use3(DomainStack);
  const frontend = new StaticSite(stack, "frontend-site", {
    path: "packages/frontend",
    buildOutput: "dist",
    buildCommand: "npm run build",
    customDomain: {
      domainName: domain,
      hostedZone: hostedZoneName
    },
    environment: {
      VITE_API_URL: url,
      VITE_GRAPHQL_URL: graphqlUrl
    }
  });
  const frontUrl = frontend.customDomainUrl || frontend.url;
  if (frontUrl) {
    stack.addOutputs({
      FrontendUrl: frontUrl
    });
  }
  return frontend;
}
__name(FrontendStack, "FrontendStack");

// stacks/ses-stack.ts
import * as route53 from "aws-cdk-lib/aws-route53";
import * as ses from "aws-cdk-lib/aws-ses";
import { use as use4 } from "sst/constructs";
import { RemovalPolicy } from "aws-cdk-lib";
function SesStack({ stack }) {
  const { hostedZoneName, mailDomain } = use4(DomainStack);
  const hostedZone = route53.HostedZone.fromLookup(stack, "HostedZone", {
    domainName: hostedZoneName
  });
  const identity = new ses.EmailIdentity(stack, "Identity", {
    identity: ses.Identity.publicHostedZone(hostedZone),
    mailFromDomain: mailDomain
  });
  identity.applyRemovalPolicy(RemovalPolicy.DESTROY);
  stack.addOutputs({
    EmailIdentity: identity.emailIdentityName,
    HostedZoneId: hostedZone.hostedZoneId
  });
  return { identity };
}
__name(SesStack, "SesStack");

// sst.config.ts
import_dotenv.default.config({
  path: findConfig(".env"),
  override: true
});
import_dotenv.default.config({
  path: findConfig(".env.local"),
  override: true
});
var sst_config_default = {
  config(_input) {
    return {
      name: "dubs-app",
      region: "us-west-2"
    };
  },
  stacks(app) {
    app.stack(DomainStack).stack(SesStack).stack(PostgresStack).stack(ApiStack).stack(AuthStack).stack(FrontendStack);
  }
};
export {
  sst_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzL2RvdGVudi9wYWNrYWdlLmpzb24iLCAibm9kZV9tb2R1bGVzL2RvdGVudi9saWIvbWFpbi5qcyIsICJzc3QuY29uZmlnLnRzIiwgInN0YWNrcy9hcGktc3RhY2sudHMiLCAic3RhY2tzL2RvbWFpbi1zdGFjay50cyIsICJzdGFja3MvcG9zdGdyZXMtc3RhY2sudHMiLCAic3RhY2tzL2F1dGgtc3RhY2sudHMiLCAic3RhY2tzL2Zyb250ZW5kLXN0YWNrLnRzIiwgInN0YWNrcy9zZXMtc3RhY2sudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIntcbiAgXCJuYW1lXCI6IFwiZG90ZW52XCIsXG4gIFwidmVyc2lvblwiOiBcIjE2LjAuM1wiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiTG9hZHMgZW52aXJvbm1lbnQgdmFyaWFibGVzIGZyb20gLmVudiBmaWxlXCIsXG4gIFwibWFpblwiOiBcImxpYi9tYWluLmpzXCIsXG4gIFwidHlwZXNcIjogXCJsaWIvbWFpbi5kLnRzXCIsXG4gIFwiZXhwb3J0c1wiOiB7XG4gICAgXCIuXCI6IHtcbiAgICAgIFwicmVxdWlyZVwiOiBcIi4vbGliL21haW4uanNcIixcbiAgICAgIFwidHlwZXNcIjogXCIuL2xpYi9tYWluLmQudHNcIixcbiAgICAgIFwiZGVmYXVsdFwiOiBcIi4vbGliL21haW4uanNcIlxuICAgIH0sXG4gICAgXCIuL2NvbmZpZ1wiOiBcIi4vY29uZmlnLmpzXCIsXG4gICAgXCIuL2NvbmZpZy5qc1wiOiBcIi4vY29uZmlnLmpzXCIsXG4gICAgXCIuL2xpYi9lbnYtb3B0aW9uc1wiOiBcIi4vbGliL2Vudi1vcHRpb25zLmpzXCIsXG4gICAgXCIuL2xpYi9lbnYtb3B0aW9ucy5qc1wiOiBcIi4vbGliL2Vudi1vcHRpb25zLmpzXCIsXG4gICAgXCIuL2xpYi9jbGktb3B0aW9uc1wiOiBcIi4vbGliL2NsaS1vcHRpb25zLmpzXCIsXG4gICAgXCIuL2xpYi9jbGktb3B0aW9ucy5qc1wiOiBcIi4vbGliL2NsaS1vcHRpb25zLmpzXCIsXG4gICAgXCIuL3BhY2thZ2UuanNvblwiOiBcIi4vcGFja2FnZS5qc29uXCJcbiAgfSxcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImR0cy1jaGVja1wiOiBcInRzYyAtLXByb2plY3QgdGVzdHMvdHlwZXMvdHNjb25maWcuanNvblwiLFxuICAgIFwibGludFwiOiBcInN0YW5kYXJkXCIsXG4gICAgXCJsaW50LXJlYWRtZVwiOiBcInN0YW5kYXJkLW1hcmtkb3duXCIsXG4gICAgXCJwcmV0ZXN0XCI6IFwibnBtIHJ1biBsaW50ICYmIG5wbSBydW4gZHRzLWNoZWNrXCIsXG4gICAgXCJ0ZXN0XCI6IFwidGFwIHRlc3RzLyouanMgLS0xMDAgLVJzcGVjXCIsXG4gICAgXCJwcmVyZWxlYXNlXCI6IFwibnBtIHRlc3RcIixcbiAgICBcInJlbGVhc2VcIjogXCJzdGFuZGFyZC12ZXJzaW9uXCJcbiAgfSxcbiAgXCJyZXBvc2l0b3J5XCI6IHtcbiAgICBcInR5cGVcIjogXCJnaXRcIixcbiAgICBcInVybFwiOiBcImdpdDovL2dpdGh1Yi5jb20vbW90ZG90bGEvZG90ZW52LmdpdFwiXG4gIH0sXG4gIFwia2V5d29yZHNcIjogW1xuICAgIFwiZG90ZW52XCIsXG4gICAgXCJlbnZcIixcbiAgICBcIi5lbnZcIixcbiAgICBcImVudmlyb25tZW50XCIsXG4gICAgXCJ2YXJpYWJsZXNcIixcbiAgICBcImNvbmZpZ1wiLFxuICAgIFwic2V0dGluZ3NcIlxuICBdLFxuICBcInJlYWRtZUZpbGVuYW1lXCI6IFwiUkVBRE1FLm1kXCIsXG4gIFwibGljZW5zZVwiOiBcIkJTRC0yLUNsYXVzZVwiLFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAdHlwZXMvbm9kZVwiOiBcIl4xNy4wLjlcIixcbiAgICBcImRlY2FjaGVcIjogXCJeNC42LjFcIixcbiAgICBcImR0c2xpbnRcIjogXCJeMy43LjBcIixcbiAgICBcInNpbm9uXCI6IFwiXjEyLjAuMVwiLFxuICAgIFwic3RhbmRhcmRcIjogXCJeMTYuMC40XCIsXG4gICAgXCJzdGFuZGFyZC1tYXJrZG93blwiOiBcIl43LjEuMFwiLFxuICAgIFwic3RhbmRhcmQtdmVyc2lvblwiOiBcIl45LjMuMlwiLFxuICAgIFwidGFwXCI6IFwiXjE1LjEuNlwiLFxuICAgIFwidGFyXCI6IFwiXjYuMS4xMVwiLFxuICAgIFwidHlwZXNjcmlwdFwiOiBcIl40LjUuNFwiXG4gIH0sXG4gIFwiZW5naW5lc1wiOiB7XG4gICAgXCJub2RlXCI6IFwiPj0xMlwiXG4gIH1cbn1cbiIsICJjb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJylcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbmNvbnN0IG9zID0gcmVxdWlyZSgnb3MnKVxuY29uc3QgcGFja2FnZUpzb24gPSByZXF1aXJlKCcuLi9wYWNrYWdlLmpzb24nKVxuXG5jb25zdCB2ZXJzaW9uID0gcGFja2FnZUpzb24udmVyc2lvblxuXG5jb25zdCBMSU5FID0gLyg/Ol58XilcXHMqKD86ZXhwb3J0XFxzKyk/KFtcXHcuLV0rKSg/Olxccyo9XFxzKj98Olxccys/KShcXHMqJyg/OlxcXFwnfFteJ10pKid8XFxzKlwiKD86XFxcXFwifFteXCJdKSpcInxcXHMqYCg/OlxcXFxgfFteYF0pKmB8W14jXFxyXFxuXSspP1xccyooPzojLiopPyg/OiR8JCkvbWdcblxuLy8gUGFyc2VyIHNyYyBpbnRvIGFuIE9iamVjdFxuZnVuY3Rpb24gcGFyc2UgKHNyYykge1xuICBjb25zdCBvYmogPSB7fVxuXG4gIC8vIENvbnZlcnQgYnVmZmVyIHRvIHN0cmluZ1xuICBsZXQgbGluZXMgPSBzcmMudG9TdHJpbmcoKVxuXG4gIC8vIENvbnZlcnQgbGluZSBicmVha3MgdG8gc2FtZSBmb3JtYXRcbiAgbGluZXMgPSBsaW5lcy5yZXBsYWNlKC9cXHJcXG4/L21nLCAnXFxuJylcblxuICBsZXQgbWF0Y2hcbiAgd2hpbGUgKChtYXRjaCA9IExJTkUuZXhlYyhsaW5lcykpICE9IG51bGwpIHtcbiAgICBjb25zdCBrZXkgPSBtYXRjaFsxXVxuXG4gICAgLy8gRGVmYXVsdCB1bmRlZmluZWQgb3IgbnVsbCB0byBlbXB0eSBzdHJpbmdcbiAgICBsZXQgdmFsdWUgPSAobWF0Y2hbMl0gfHwgJycpXG5cbiAgICAvLyBSZW1vdmUgd2hpdGVzcGFjZVxuICAgIHZhbHVlID0gdmFsdWUudHJpbSgpXG5cbiAgICAvLyBDaGVjayBpZiBkb3VibGUgcXVvdGVkXG4gICAgY29uc3QgbWF5YmVRdW90ZSA9IHZhbHVlWzBdXG5cbiAgICAvLyBSZW1vdmUgc3Vycm91bmRpbmcgcXVvdGVzXG4gICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9eKFsnXCJgXSkoW1xcc1xcU10qKVxcMSQvbWcsICckMicpXG5cbiAgICAvLyBFeHBhbmQgbmV3bGluZXMgaWYgZG91YmxlIHF1b3RlZFxuICAgIGlmIChtYXliZVF1b3RlID09PSAnXCInKSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1xcXFxuL2csICdcXG4nKVxuICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9cXFxcci9nLCAnXFxyJylcbiAgICB9XG5cbiAgICAvLyBBZGQgdG8gb2JqZWN0XG4gICAgb2JqW2tleV0gPSB2YWx1ZVxuICB9XG5cbiAgcmV0dXJuIG9ialxufVxuXG5mdW5jdGlvbiBfbG9nIChtZXNzYWdlKSB7XG4gIGNvbnNvbGUubG9nKGBbZG90ZW52QCR7dmVyc2lvbn1dW0RFQlVHXSAke21lc3NhZ2V9YClcbn1cblxuZnVuY3Rpb24gX3Jlc29sdmVIb21lIChlbnZQYXRoKSB7XG4gIHJldHVybiBlbnZQYXRoWzBdID09PSAnficgPyBwYXRoLmpvaW4ob3MuaG9tZWRpcigpLCBlbnZQYXRoLnNsaWNlKDEpKSA6IGVudlBhdGhcbn1cblxuLy8gUG9wdWxhdGVzIHByb2Nlc3MuZW52IGZyb20gLmVudiBmaWxlXG5mdW5jdGlvbiBjb25maWcgKG9wdGlvbnMpIHtcbiAgbGV0IGRvdGVudlBhdGggPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJy5lbnYnKVxuICBsZXQgZW5jb2RpbmcgPSAndXRmOCdcbiAgY29uc3QgZGVidWcgPSBCb29sZWFuKG9wdGlvbnMgJiYgb3B0aW9ucy5kZWJ1ZylcbiAgY29uc3Qgb3ZlcnJpZGUgPSBCb29sZWFuKG9wdGlvbnMgJiYgb3B0aW9ucy5vdmVycmlkZSlcblxuICBpZiAob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLnBhdGggIT0gbnVsbCkge1xuICAgICAgZG90ZW52UGF0aCA9IF9yZXNvbHZlSG9tZShvcHRpb25zLnBhdGgpXG4gICAgfVxuICAgIGlmIChvcHRpb25zLmVuY29kaW5nICE9IG51bGwpIHtcbiAgICAgIGVuY29kaW5nID0gb3B0aW9ucy5lbmNvZGluZ1xuICAgIH1cbiAgfVxuXG4gIHRyeSB7XG4gICAgLy8gU3BlY2lmeWluZyBhbiBlbmNvZGluZyByZXR1cm5zIGEgc3RyaW5nIGluc3RlYWQgb2YgYSBidWZmZXJcbiAgICBjb25zdCBwYXJzZWQgPSBEb3RlbnZNb2R1bGUucGFyc2UoZnMucmVhZEZpbGVTeW5jKGRvdGVudlBhdGgsIHsgZW5jb2RpbmcgfSkpXG5cbiAgICBPYmplY3Qua2V5cyhwYXJzZWQpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocHJvY2Vzcy5lbnYsIGtleSkpIHtcbiAgICAgICAgcHJvY2Vzcy5lbnZba2V5XSA9IHBhcnNlZFtrZXldXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAob3ZlcnJpZGUgPT09IHRydWUpIHtcbiAgICAgICAgICBwcm9jZXNzLmVudltrZXldID0gcGFyc2VkW2tleV1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkZWJ1Zykge1xuICAgICAgICAgIGlmIChvdmVycmlkZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgX2xvZyhgXCIke2tleX1cIiBpcyBhbHJlYWR5IGRlZmluZWQgaW4gXFxgcHJvY2Vzcy5lbnZcXGAgYW5kIFdBUyBvdmVyd3JpdHRlbmApXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF9sb2coYFwiJHtrZXl9XCIgaXMgYWxyZWFkeSBkZWZpbmVkIGluIFxcYHByb2Nlc3MuZW52XFxgIGFuZCB3YXMgTk9UIG92ZXJ3cml0dGVuYClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuIHsgcGFyc2VkIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmIChkZWJ1Zykge1xuICAgICAgX2xvZyhgRmFpbGVkIHRvIGxvYWQgJHtkb3RlbnZQYXRofSAke2UubWVzc2FnZX1gKVxuICAgIH1cblxuICAgIHJldHVybiB7IGVycm9yOiBlIH1cbiAgfVxufVxuXG5jb25zdCBEb3RlbnZNb2R1bGUgPSB7XG4gIGNvbmZpZyxcbiAgcGFyc2Vcbn1cblxubW9kdWxlLmV4cG9ydHMuY29uZmlnID0gRG90ZW52TW9kdWxlLmNvbmZpZ1xubW9kdWxlLmV4cG9ydHMucGFyc2UgPSBEb3RlbnZNb2R1bGUucGFyc2Vcbm1vZHVsZS5leHBvcnRzID0gRG90ZW52TW9kdWxlXG4iLCAiaW1wb3J0IGRvdGVudiBmcm9tICdkb3RlbnYnO1xuaW1wb3J0IGZpbmRDb25maWcgZnJvbSAnZmluZC1jb25maWcnO1xuaW1wb3J0IHsgU1NUQ29uZmlnIH0gZnJvbSAnc3N0JztcbmltcG9ydCB7IEFwaVN0YWNrIH0gZnJvbSAnLi9zdGFja3MvYXBpLXN0YWNrJztcbmltcG9ydCB7IEF1dGhTdGFjayB9IGZyb20gJy4vc3RhY2tzL2F1dGgtc3RhY2snO1xuaW1wb3J0IHsgRG9tYWluU3RhY2sgfSBmcm9tICcuL3N0YWNrcy9kb21haW4tc3RhY2snO1xuaW1wb3J0IHsgRnJvbnRlbmRTdGFjayB9IGZyb20gJy4vc3RhY2tzL2Zyb250ZW5kLXN0YWNrJztcbmltcG9ydCB7IFBvc3RncmVzU3RhY2sgfSBmcm9tICcuL3N0YWNrcy9wb3N0Z3Jlcy1zdGFjayc7XG5pbXBvcnQgeyBTZXNTdGFjayB9IGZyb20gJy4vc3RhY2tzL3Nlcy1zdGFjayc7XG5cbmRvdGVudi5jb25maWcoe1xuICBwYXRoOiBmaW5kQ29uZmlnKCcuZW52JykgYXMgc3RyaW5nLFxuICBvdmVycmlkZTogdHJ1ZSxcbn0pO1xuZG90ZW52LmNvbmZpZyh7XG4gIHBhdGg6IGZpbmRDb25maWcoJy5lbnYubG9jYWwnKSBhcyBzdHJpbmcsXG4gIG92ZXJyaWRlOiB0cnVlLFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29uZmlnKF9pbnB1dCkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiAnZHVicy1hcHAnLFxuICAgICAgcmVnaW9uOiAndXMtd2VzdC0yJyxcbiAgICB9O1xuICB9LFxuICBzdGFja3MoYXBwKSB7XG4gICAgYXBwXG4gICAgICAuc3RhY2soRG9tYWluU3RhY2spXG4gICAgICAuc3RhY2soU2VzU3RhY2spXG4gICAgICAuc3RhY2soUG9zdGdyZXNTdGFjaylcbiAgICAgIC5zdGFjayhBcGlTdGFjaylcbiAgICAgIC5zdGFjayhBdXRoU3RhY2spXG4gICAgICAuc3RhY2soRnJvbnRlbmRTdGFjayk7XG4gIH0sXG59IHNhdGlzZmllcyBTU1RDb25maWc7XG4iLCAiaW1wb3J0IHsgQXBpLCBTdGFja0NvbnRleHQsIHVzZSB9IGZyb20gJ3NzdC9jb25zdHJ1Y3RzJztcblxuaW1wb3J0IHsgRG9tYWluU3RhY2sgfSBmcm9tICcuL2RvbWFpbi1zdGFjayc7XG5pbXBvcnQgeyBQb3N0Z3Jlc1N0YWNrIH0gZnJvbSAnLi9wb3N0Z3Jlcy1zdGFjayc7XG5cbmV4cG9ydCBmdW5jdGlvbiBBcGlTdGFjayh7IHN0YWNrIH06IFN0YWNrQ29udGV4dCkge1xuICBjb25zdCBkYiA9IHVzZShQb3N0Z3Jlc1N0YWNrKTtcbiAgY29uc3QgeyBhbGxvd09yaWdpbnMsIGFwaURvbWFpbiwgaG9zdGVkWm9uZU5hbWUgfSA9IHVzZShEb21haW5TdGFjayk7XG5cbiAgY29uc3QgYXBpID0gbmV3IEFwaShzdGFjaywgJ2FwaScsIHtcbiAgICBkZWZhdWx0czoge1xuICAgICAgZnVuY3Rpb246IHtcbiAgICAgICAgYmluZDogW2RiXSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjdXN0b21Eb21haW46IHtcbiAgICAgIGRvbWFpbk5hbWU6IGFwaURvbWFpbixcbiAgICAgIGhvc3RlZFpvbmU6IGhvc3RlZFpvbmVOYW1lLFxuICAgIH0sXG4gICAgY29yczoge1xuICAgICAgYWxsb3dDcmVkZW50aWFsczogdHJ1ZSxcbiAgICAgIGFsbG93SGVhZGVyczogWydjb250ZW50LXR5cGUnLCAnYXV0aG9yaXphdGlvbicsICdhY2NlcHQnXSxcbiAgICAgIGFsbG93TWV0aG9kczogWydBTlknXSxcbiAgICAgIGFsbG93T3JpZ2lucyxcbiAgICB9LFxuICAgIHJvdXRlczoge1xuICAgICAgJ1BPU1QgL2dyYXBocWwnOiB7XG4gICAgICAgIHR5cGU6ICdncmFwaHFsJyxcbiAgICAgICAgZnVuY3Rpb246IHtcbiAgICAgICAgICBoYW5kbGVyOiAncGFja2FnZXMvZnVuY3Rpb25zL3NyYy9ncmFwaHFsL3NlcnZlci5oYW5kbGVyJyxcbiAgICAgICAgfSxcbiAgICAgICAgcG90aG9zOiB7XG4gICAgICAgICAgc2NoZW1hOiAncGFja2FnZXMvZnVuY3Rpb25zL3NyYy9ncmFwaHFsL3NjaGVtYS50cycsXG4gICAgICAgICAgLy8gV2UgbmVlZCB0byBwdXQgdGhlIGdlbmVyYXRlZCBzY2hlbWEgZmlsZVxuICAgICAgICAgIC8vIG91dHNpZGUgb2YgdGhlIG1haW4gZm9sZGVyIHNvIHRoZSBcImZpbGUuY2hhbmdlZFwiXG4gICAgICAgICAgLy8gZXZlbnQgZG9lc24ndCBnZXQgdHJpZ2dlcmVkIGNpcmN1bGFybHkuXG4gICAgICAgICAgLy8gQHNlcnZlcmxlc3Mtc3RhY2svY29yZS9kaXN0L2NsaS9Qb3Rob3NCdWlsZGVyLmpzXG4gICAgICAgICAgb3V0cHV0OiAnZ3JhcGhxbC1vdXRwdXQvc2NoZW1hLmdyYXBocWwnLFxuICAgICAgICAgIGNvbW1hbmRzOiBbJ25wbSBydW4gZ3FsJ10sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgJ0dFVCAvZ3JhcGhxbCc6IHtcbiAgICAgICAgdHlwZTogJ2dyYXBocWwnLFxuICAgICAgICBmdW5jdGlvbjoge1xuICAgICAgICAgIGhhbmRsZXI6ICdwYWNrYWdlcy9mdW5jdGlvbnMvc3JjL2dyYXBocWwvc2VydmVyLmhhbmRsZXInLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9KTtcblxuICBjb25zdCB1cmwgPSBhcGkuY3VzdG9tRG9tYWluVXJsIHx8IGFwaS51cmw7XG4gIGNvbnN0IGdyYXBocWxVcmwgPSBgJHt1cmx9L2dyYXBocWxgO1xuXG4gIHN0YWNrLmFkZE91dHB1dHMoe1xuICAgIEFwaVVybDogdXJsLFxuICAgIEdyYXBocWxVcmw6IGdyYXBocWxVcmwsXG4gIH0pO1xuXG4gIHJldHVybiB7IGFwaSwgZ3JhcGhxbFVybCwgdXJsIH07XG59XG4iLCAiaW1wb3J0IHsgU3RhY2tDb250ZXh0IH0gZnJvbSAnc3N0L2NvbnN0cnVjdHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gRG9tYWluU3RhY2soeyBzdGFjayB9OiBTdGFja0NvbnRleHQpIHtcbiAgY29uc3QgZG9tYWluTmFtZSA9IHByb2Nlc3MuZW52LkRPTUFJTl9OQU1FO1xuXG4gIGlmICghZG9tYWluTmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBET01BSU5fTkFNRSBlbnYgdmFyaWFibGUgaW4gLmVudi5sb2NhbCcpO1xuICB9XG5cbiAgY29uc3QgRE9NQUlOOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICAgIGRldjogYGRldi4ke3N0YWNrLnN0YWdlfS4ke2RvbWFpbk5hbWV9YCxcbiAgICBwcm9kOiBkb21haW5OYW1lLFxuICAgIHN0YWdpbmc6IGBzdGFnaW5nLiR7ZG9tYWluTmFtZX1gLFxuICB9O1xuXG4gIGNvbnN0IGFwaURvbWFpbiA9IERPTUFJTltzdGFjay5zdGFnZV1cbiAgICA/IGBhcGkuJHtET01BSU5bc3RhY2suc3RhZ2VdfWBcbiAgICA6IGBhcGkuJHtET01BSU4uZGV2fWA7XG4gIGNvbnN0IGRvY3NEb21haW4gPSBET01BSU5bc3RhY2suc3RhZ2VdXG4gICAgPyBgZG9jcy4ke0RPTUFJTltzdGFjay5zdGFnZV19YFxuICAgIDogYGRvY3MuJHtET01BSU4uZGV2fWA7XG4gIGNvbnN0IGRvbWFpbiA9IERPTUFJTltzdGFjay5zdGFnZV0gPyBET01BSU5bc3RhY2suc3RhZ2VdIDogRE9NQUlOLmRldjtcbiAgY29uc3QgbWFpbERvbWFpbiA9IERPTUFJTltzdGFjay5zdGFnZV1cbiAgICA/IGBtYWlsLiR7RE9NQUlOW3N0YWNrLnN0YWdlXX1gXG4gICAgOiBgbWFpbC4ke0RPTUFJTi5kZXZ9YDtcblxuICBjb25zdCBhbGxvd09yaWdpbnMgPSAhIXByb2Nlc3MuZW52LklTX0xPQ0FMXG4gICAgPyBbYGh0dHBzOi8vJHtkb21haW59YCwgYGh0dHBzOi8vJHthcGlEb21haW59YF1cbiAgICA6IFtgaHR0cHM6Ly8ke2RvbWFpbn1gLCBgaHR0cHM6Ly8ke2FwaURvbWFpbn1gLCAnaHR0cDovL2xvY2FsaG9zdDozMDAwJ107XG5cbiAgc3RhY2suYWRkT3V0cHV0cyh7XG4gICAgQWxsb3dPcmlnaW5zOiBhbGxvd09yaWdpbnMuam9pbignLCcpLFxuICAgIEFwaURvbWFpbjogYXBpRG9tYWluLFxuICAgIERvY3NEb21haW46IGRvY3NEb21haW4sXG4gICAgRG9tYWluOiBkb21haW4sXG4gICAgSG9zdGVkWm9uZU5hbWU6IGRvbWFpbk5hbWUsXG4gICAgTWFpbERvbWFpbjogbWFpbERvbWFpbixcbiAgfSk7XG5cbiAgcmV0dXJuIHtcbiAgICBhbGxvd09yaWdpbnMsXG4gICAgYXBpRG9tYWluLFxuICAgIGRvY3NEb21haW4sXG4gICAgZG9tYWluLFxuICAgIGhvc3RlZFpvbmVOYW1lOiBkb21haW5OYW1lLFxuICAgIG1haWxEb21haW4sXG4gIH07XG59XG4iLCAiaW1wb3J0IHsgUkRTLCBTdGFja0NvbnRleHQgfSBmcm9tICdzc3QvY29uc3RydWN0cyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBQb3N0Z3Jlc1N0YWNrKHsgc3RhY2sgfTogU3RhY2tDb250ZXh0KSB7XG4gIGNvbnN0IHJkcyA9IG5ldyBSRFMoc3RhY2ssICdkYi1yZHMnLCB7XG4gICAgZW5naW5lOiAncG9zdGdyZXNxbDExLjEzJyxcbiAgICBkZWZhdWx0RGF0YWJhc2VOYW1lOiAnbWFpbicsXG4gICAgc2NhbGluZzoge1xuICAgICAgYXV0b1BhdXNlOiBzdGFjay5zdGFnZSAhPT0gJ3Byb2QnLFxuICAgICAgbWluQ2FwYWNpdHk6ICdBQ1VfMicsXG4gICAgICBtYXhDYXBhY2l0eTogc3RhY2suc3RhZ2UgIT09ICdwcm9kJyA/ICdBQ1VfMicgOiAnQUNVXzQnLFxuICAgIH0sXG4gICAgbWlncmF0aW9uczogJ3BhY2thZ2VzL2RhdGFiYXNlcy9zcmMvbWlncmF0aW9ucycsXG4gICAgdHlwZXM6ICdwYWNrYWdlcy9jb3JlL3NyYy90eXBlcy9zcWwuZ2VuZXJhdGVkLnRzJyxcbiAgfSk7XG5cbiAgcmV0dXJuIHJkcztcbn1cbiIsICJpbXBvcnQgeyBBdXRoLCBTdGFja0NvbnRleHQsIHVzZSB9IGZyb20gJ3NzdC9jb25zdHJ1Y3RzJztcblxuaW1wb3J0IHsgQXBpU3RhY2sgfSBmcm9tICcuL2FwaS1zdGFjayc7XG5pbXBvcnQgeyBEb21haW5TdGFjayB9IGZyb20gJy4vZG9tYWluLXN0YWNrJztcblxuZXhwb3J0IGNvbnN0IEF1dGhTdGFjayA9ICh7IHN0YWNrIH06IFN0YWNrQ29udGV4dCkgPT4ge1xuICBjb25zdCB7IGFwaSB9ID0gdXNlKEFwaVN0YWNrKTtcbiAgY29uc3QgeyBkb21haW4sIG1haWxEb21haW4gfSA9IHVzZShEb21haW5TdGFjayk7XG5cbiAgY29uc3QgYXV0aCA9IG5ldyBBdXRoKHN0YWNrLCAnYXV0aCcsIHtcbiAgICBhdXRoZW50aWNhdG9yOiB7XG4gICAgICBoYW5kbGVyOiAncGFja2FnZXMvZnVuY3Rpb25zL3NyYy9hdXRoLmhhbmRsZXInLFxuICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgTUFJTF9ET01BSU46IG1haWxEb21haW4sXG4gICAgICAgIFJFRElSRUNUX1VSTDogISFwcm9jZXNzLmVudi5JU19MT0NBTFxuICAgICAgICAgID8gYGh0dHBzOi8vJHtkb21haW59YFxuICAgICAgICAgIDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCcsXG4gICAgICB9LFxuICAgICAgcGVybWlzc2lvbnM6IFsnc2VzOlNlbmRFbWFpbCcsICdzZXM6U2VuZFJhd0VtYWlsJ10sXG4gICAgfSxcbiAgfSk7XG5cbiAgYXV0aC5hdHRhY2goc3RhY2ssIHtcbiAgICBhcGk6IGFwaSxcbiAgICBwcmVmaXg6ICcvYXV0aCcsXG4gIH0pO1xuXG4gIHJldHVybiBhdXRoO1xufTtcbiIsICJpbXBvcnQgeyBTdGFja0NvbnRleHQsIFN0YXRpY1NpdGUsIGRlcGVuZHNPbiwgdXNlIH0gZnJvbSAnc3N0L2NvbnN0cnVjdHMnO1xuXG5pbXBvcnQgeyBBcGlTdGFjayB9IGZyb20gJy4vYXBpLXN0YWNrJztcbmltcG9ydCB7IERvbWFpblN0YWNrIH0gZnJvbSAnLi9kb21haW4tc3RhY2snO1xuXG5leHBvcnQgZnVuY3Rpb24gRnJvbnRlbmRTdGFjayh7IHN0YWNrIH06IFN0YWNrQ29udGV4dCkge1xuICBkZXBlbmRzT24oQXBpU3RhY2spO1xuICBjb25zdCB7IGdyYXBocWxVcmwsIHVybCB9ID0gdXNlKEFwaVN0YWNrKTtcbiAgY29uc3QgeyBkb21haW4sIGhvc3RlZFpvbmVOYW1lIH0gPSB1c2UoRG9tYWluU3RhY2spO1xuXG4gIGNvbnN0IGZyb250ZW5kID0gbmV3IFN0YXRpY1NpdGUoc3RhY2ssICdmcm9udGVuZC1zaXRlJywge1xuICAgIHBhdGg6ICdwYWNrYWdlcy9mcm9udGVuZCcsXG4gICAgYnVpbGRPdXRwdXQ6ICdkaXN0JyxcbiAgICBidWlsZENvbW1hbmQ6ICducG0gcnVuIGJ1aWxkJyxcbiAgICBjdXN0b21Eb21haW46IHtcbiAgICAgIGRvbWFpbk5hbWU6IGRvbWFpbixcbiAgICAgIGhvc3RlZFpvbmU6IGhvc3RlZFpvbmVOYW1lLFxuICAgIH0sXG4gICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgIFZJVEVfQVBJX1VSTDogdXJsLFxuICAgICAgVklURV9HUkFQSFFMX1VSTDogZ3JhcGhxbFVybCxcbiAgICB9LFxuICB9KTtcblxuICBjb25zdCBmcm9udFVybCA9IGZyb250ZW5kLmN1c3RvbURvbWFpblVybCB8fCBmcm9udGVuZC51cmw7XG5cbiAgaWYgKGZyb250VXJsKSB7XG4gICAgc3RhY2suYWRkT3V0cHV0cyh7XG4gICAgICBGcm9udGVuZFVybDogZnJvbnRVcmwsXG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gZnJvbnRlbmQ7XG59XG4iLCAiaW1wb3J0ICogYXMgcm91dGU1MyBmcm9tICdhd3MtY2RrLWxpYi9hd3Mtcm91dGU1Myc7XG5pbXBvcnQgKiBhcyBzZXMgZnJvbSAnYXdzLWNkay1saWIvYXdzLXNlcyc7XG5cbmltcG9ydCB7IFN0YWNrQ29udGV4dCwgdXNlIH0gZnJvbSAnc3N0L2NvbnN0cnVjdHMnO1xuXG5pbXBvcnQgeyBEb21haW5TdGFjayB9IGZyb20gJy4vZG9tYWluLXN0YWNrJztcbmltcG9ydCB7IFJlbW92YWxQb2xpY3kgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5cbmV4cG9ydCBmdW5jdGlvbiBTZXNTdGFjayh7IHN0YWNrIH06IFN0YWNrQ29udGV4dCkge1xuICBjb25zdCB7IGhvc3RlZFpvbmVOYW1lLCBtYWlsRG9tYWluIH0gPSB1c2UoRG9tYWluU3RhY2spO1xuXG4gIGNvbnN0IGhvc3RlZFpvbmUgPSByb3V0ZTUzLkhvc3RlZFpvbmUuZnJvbUxvb2t1cChzdGFjaywgJ0hvc3RlZFpvbmUnLCB7XG4gICAgZG9tYWluTmFtZTogaG9zdGVkWm9uZU5hbWUsXG4gIH0pO1xuXG4gIGNvbnN0IGlkZW50aXR5ID0gbmV3IHNlcy5FbWFpbElkZW50aXR5KHN0YWNrLCAnSWRlbnRpdHknLCB7XG4gICAgaWRlbnRpdHk6IHNlcy5JZGVudGl0eS5wdWJsaWNIb3N0ZWRab25lKGhvc3RlZFpvbmUpLFxuICAgIG1haWxGcm9tRG9tYWluOiBtYWlsRG9tYWluLFxuICB9KTtcblxuICBpZGVudGl0eS5hcHBseVJlbW92YWxQb2xpY3koUmVtb3ZhbFBvbGljeS5ERVNUUk9ZKTtcblxuICBzdGFjay5hZGRPdXRwdXRzKHtcbiAgICBFbWFpbElkZW50aXR5OiBpZGVudGl0eS5lbWFpbElkZW50aXR5TmFtZSxcbiAgICBIb3N0ZWRab25lSWQ6IGhvc3RlZFpvbmUuaG9zdGVkWm9uZUlkLFxuICB9KTtcblxuICByZXR1cm4geyBpZGVudGl0eSB9O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUNFLE1BQVE7QUFBQSxNQUNSLFNBQVc7QUFBQSxNQUNYLGFBQWU7QUFBQSxNQUNmLE1BQVE7QUFBQSxNQUNSLE9BQVM7QUFBQSxNQUNULFNBQVc7QUFBQSxRQUNULEtBQUs7QUFBQSxVQUNILFNBQVc7QUFBQSxVQUNYLE9BQVM7QUFBQSxVQUNULFNBQVc7QUFBQSxRQUNiO0FBQUEsUUFDQSxZQUFZO0FBQUEsUUFDWixlQUFlO0FBQUEsUUFDZixxQkFBcUI7QUFBQSxRQUNyQix3QkFBd0I7QUFBQSxRQUN4QixxQkFBcUI7QUFBQSxRQUNyQix3QkFBd0I7QUFBQSxRQUN4QixrQkFBa0I7QUFBQSxNQUNwQjtBQUFBLE1BQ0EsU0FBVztBQUFBLFFBQ1QsYUFBYTtBQUFBLFFBQ2IsTUFBUTtBQUFBLFFBQ1IsZUFBZTtBQUFBLFFBQ2YsU0FBVztBQUFBLFFBQ1gsTUFBUTtBQUFBLFFBQ1IsWUFBYztBQUFBLFFBQ2QsU0FBVztBQUFBLE1BQ2I7QUFBQSxNQUNBLFlBQWM7QUFBQSxRQUNaLE1BQVE7QUFBQSxRQUNSLEtBQU87QUFBQSxNQUNUO0FBQUEsTUFDQSxVQUFZO0FBQUEsUUFDVjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxR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TSxHQUFpQjtBQUNyRCxZQUFVLFFBQVE7QUFDbEIsUUFBTSxFQUFFLFlBQVksSUFBSSxJQUFJQyxLQUFJLFFBQVE7QUFDeEMsUUFBTSxFQUFFLFFBQVEsZUFBZSxJQUFJQSxLQUFJLFdBQVc7QUFFbEQsUUFBTSxXQUFXLElBQUksV0FBVyxPQUFPLGlCQUFpQjtBQUFBLElBQ3RELE1BQU07QUFBQSxJQUNOLGFBQWE7QUFBQSxJQUNiLGNBQWM7QUFBQSxJQUNkLGNBQWM7QUFBQSxNQUNaLFlBQVk7QUFBQSxNQUNaLFlBQVk7QUFBQSxJQUNkO0FBQUEsSUFDQSxhQUFhO0FBQUEsTUFDWCxjQUFjO0FBQUEsTUFDZCxrQkFBa0I7QUFBQSxJQUNwQjtBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU0sV0FBVyxTQUFTLG1CQUFtQixTQUFTO0FBRXRELE1BQUksVUFBVTtBQUNaLFVBQU0sV0FBVztBQUFBLE1BQ2YsYUFBYTtBQUFBLElBQ2YsQ0FBQztBQUFBLEVBQ0g7QUFFQSxTQUFPO0FBQ1Q7QUE1QmdCOzs7QUNMaEIsWUFBWSxhQUFhO0FBQ3pCLFlBQVksU0FBUztBQUVyQixTQUF1QixPQUFBQyxZQUFXO0FBR2xDLFNBQVMscUJBQXFCO0FBRXZCLFNBQVMsU0FBUyxFQUFFLE1BQU0sR0FBaUI7QUFDaEQsUUFBTSxFQUFFLGdCQUFnQixXQUFXLElBQUlDLEtBQUksV0FBVztBQUV0RCxRQUFNLGFBQXFCLG1CQUFXLFdBQVcsT0FBTyxjQUFjO0FBQUEsSUFDcEUsWUFBWTtBQUFBLEVBQ2QsQ0FBQztBQUVELFFBQU0sV0FBVyxJQUFRLGtCQUFjLE9BQU8sWUFBWTtBQUFBLElBQ3hELFVBQWMsYUFBUyxpQkFBaUIsVUFBVTtBQUFBLElBQ2xELGdCQUFnQjtBQUFBLEVBQ2xCLENBQUM7QUFFRCxXQUFTLG1CQUFtQixjQUFjLE9BQU87QUFFakQsUUFBTSxXQUFXO0FBQUEsSUFDZixlQUFlLFNBQVM7QUFBQSxJQUN4QixjQUFjLFdBQVc7QUFBQSxFQUMzQixDQUFDO0FBRUQsU0FBTyxFQUFFLFNBQVM7QUFDcEI7QUFwQmdCOzs7QU5FaEIsY0FBQUMsUUFBTyxPQUFPO0FBQUEsRUFDWixNQUFNLFdBQVcsTUFBTTtBQUFBLEVBQ3ZCLFVBQVU7QUFDWixDQUFDO0FBQ0QsY0FBQUEsUUFBTyxPQUFPO0FBQUEsRUFDWixNQUFNLFdBQVcsWUFBWTtBQUFBLEVBQzdCLFVBQVU7QUFDWixDQUFDO0FBRUQsSUFBTyxxQkFBUTtBQUFBLEVBQ2IsT0FBTyxRQUFRO0FBQ2IsV0FBTztBQUFBLE1BQ0wsTUFBTTtBQUFBLE1BQ04sUUFBUTtBQUFBLElBQ1Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPLEtBQUs7QUFDVixRQUNHLE1BQU0sV0FBVyxFQUNqQixNQUFNLFFBQVEsRUFDZCxNQUFNLGFBQWEsRUFDbkIsTUFBTSxRQUFRLEVBQ2QsTUFBTSxTQUFTLEVBQ2YsTUFBTSxhQUFhO0FBQUEsRUFDeEI7QUFDRjsiLAogICJuYW1lcyI6IFsidXNlIiwgInVzZSIsICJ1c2UiLCAidXNlIiwgInVzZSIsICJ1c2UiLCAiZG90ZW52Il0KfQo=
