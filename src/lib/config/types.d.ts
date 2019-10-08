// TODO(Chris): we need to port this back upstream

declare module "@maritz/mtztools-ms-helpers" {
  import { Config } from "cloud-config-client";
  function configFile(name: string, logger?: any): Promise<Config>;
}
