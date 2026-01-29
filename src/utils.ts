function isJsonParseError(err: unknown): err is { type: string; status: number; message: string } {
    return (
      typeof err === "object" &&
      err !== null &&
      "type" in err &&
      "status" in err &&
      "message" in err &&
      typeof (err as any).type === "string" &&
      typeof (err as any).status === "number" &&
      typeof (err as any).message === "string"
    );
  }

export { isJsonParseError };