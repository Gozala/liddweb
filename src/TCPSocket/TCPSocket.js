// @flow strict

export interface ServerManager {
  serve(ServerOptions): Promise<ServerSocket>;

  close(Server): Promise<void>;
}

export interface ServerOptions {
  port: number;
  backlog?: number;
}

export interface ServerSocket
  extends Server /*, AsyncIterator<TCPClientSocket>*/ {
  +localPort: number;
}

export interface Server {
  +id: string;
}

export interface ClientManager {
  connect(ClientOptions): Promise<ClientSocket>;

  suspend(Client): void;
  resume(Client): void;
  close(Client): Promise<void>;
  closeImmediately(Client): Promise<void>;
  getBufferedAmount(Client): number;
  getStatus(Client): Status;
  write(
    Client,
    ArrayBuffer,
    options: ?{ byteOffset?: number, byteLength?: number }
  ): ?Promise<void>;
  read(Client): Promise<ArrayBuffer>;
  closed(Client): Promise<void>;
  opened(Client): Promise<void>;
  errored(Client): Promise<Error>;
}

export interface ClientOptions {
  host: string;
  port: number;
  useSecureTransport?: boolean;
}

export interface ClientSocket extends Client /*, AsyncIterator<ArrayBuffer>*/ {
  +host: string;
  +port: number;
  +ssl: boolean;
}

export interface Client {
  +id: string;
}

export type Status = "connecting" | "open" | "closing" | "closed"
