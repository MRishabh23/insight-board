export const trackingMode = (env: string) => {
    switch (env) {
        case "dev":
            return ["AIR", "OCEAN", "TERMINAL"];
        case "prod":
            return ["OCEAN"];
        default:
            return ["AIR", "OCEAN", "TERMINAL"];
    }
}