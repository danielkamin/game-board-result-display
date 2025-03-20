/* eslint-disable max-classes-per-file */
import { WriteStream } from 'fs';
import * as fs from 'fs';

interface IMessageWriter {
  writeMessage(binaryData: Buffer | Uint8Array): void;
  close(): void;
}

interface IMessageReader {
  readAllMessages(): Promise<Buffer[]>;
  readMessagesInBatches(batchSize: number): Promise<Buffer[]>;
}

// Writer class to handle saving binary messages
class BinaryMessageWriter implements IMessageWriter {
  private writeStream: WriteStream;

  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
    this.writeStream = fs.createWriteStream(filePath, { flags: 'a' });
  }

  // Write a single binary message
  public writeMessage(binaryData: Buffer | Uint8Array): void {
    // Convert binary data to Buffer if it isn't already
    const buffer: Buffer = Buffer.isBuffer(binaryData)
      ? binaryData
      : Buffer.from(binaryData);

    // Write the length of the message first (4 bytes)
    const lengthBuffer: Buffer = Buffer.alloc(4);
    lengthBuffer.writeUInt32BE(buffer.length);

    // Write length followed by the actual message
    this.writeStream.write(lengthBuffer);
    this.writeStream.write(buffer);

    // Write a newline character for better readability in hex editors
    this.writeStream.write(Buffer.from([0x0a]));
  }

  public close(): void {
    this.writeStream.end();
  }
}

// Reader class to handle reading saved binary messages
class BinaryMessageReader implements IMessageReader {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  // Read all messages from the file at once
  public async readAllMessages(): Promise<Buffer[]> {
    const messages: Buffer[] = [];
    const fileBuffer: Buffer = await fs.promises.readFile(this.filePath);

    let position = 0;
    while (position < fileBuffer.length) {
      // Read message length (4 bytes)
      const messageLength: number = fileBuffer.readUInt32BE(position);
      position += 4;

      // Read the actual message
      const message: Buffer = fileBuffer.slice(
        position,
        position + messageLength
      );
      messages.push(message);

      // Skip the message and the newline character
      position += messageLength + 1;
    }

    return messages;
  }

  // Read messages in batches of specified size
  public async readMessagesInBatches(batchSize: number): Promise<Buffer[]> {
    const fileBuffer: Buffer = await fs.promises.readFile(this.filePath);
    const messages: Buffer[] = [];
    let position = 0;

    let currentBatchSize = 0;
    while (position < fileBuffer.length && currentBatchSize < batchSize) {
      const messageLength: number = fileBuffer.readUInt32BE(position);
      position += 4;

      const message: Buffer = fileBuffer.slice(
        position,
        position + messageLength
      );
      messages.push(message);

      position += messageLength + 1;
      currentBatchSize += 1;
    }

    return messages;
  }
}

// Example usage with array methods
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function example(): Promise<void> {
  try {
    // Writing messages
    const writer = new BinaryMessageWriter('udp_messages.bin');

    // Example binary data (similar to your UDP messages)
    const message1 = Buffer.from([0xfa, 0x06, 0xc8, 0xcf, 0xcf, 0x66]);
    const message2 = Buffer.from([0xfb, 0x07, 0xc9, 0xd0, 0xd0, 0x67]);

    writer.writeMessage(message1);
    writer.writeMessage(message2);
    writer.close();

    // Reading messages - Read all at once
    const reader = new BinaryMessageReader('udp_messages.bin');
    const allMessages = await reader.readAllMessages();

    // Process messages using array methods
    allMessages.forEach((message) => {
      console.log('Message:', message.toString('hex'));
    });

    // Or if you want to process in batches (e.g., 10 messages at a time)
    const batchSize = 10;
    const batchMessages = await reader.readMessagesInBatches(batchSize);
    batchMessages.forEach((message) => {
      console.log('Batch message:', message.toString('hex'));
    });
  } catch (error) {
    console.error('Error handling UDP messages:', error);
    throw error;
  }
}

export {
  IMessageWriter,
  IMessageReader,
  BinaryMessageWriter,
  BinaryMessageReader,
};
