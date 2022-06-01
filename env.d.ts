declare module "*.scss";

declare module "*.svg" {
    export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
}
