/**
 * Created by d8q8 on 2015/5/25.
 * @class JSZip
 * @constructor
 **/
interface JSZip {
    file(path:string): JSZipObject;
    file(path:RegExp): JSZipObject[];
    file(path:string, data:any, options?:JSZipFileOptions): JSZip;
    folder(name:string): JSZip;
    folder(name:RegExp): JSZipObject[];
    filter(predicate:(relativePath:string, file:JSZipObject) => boolean): JSZipObject[];
    remove(path:string): JSZip;
    generate(options?:JSZipGeneratorOptions): any;
    load(data:any, options:JSZipLoadOptions): JSZip;
}

interface JSZipObject {
    name: string;
    dir: boolean;
    date: Date;
    comment: string;
    options: JSZipObjectOptions;

    asText(): string;
    asBinary(): string;
    asArrayBuffer(): ArrayBuffer;
    asUint8Array(): Uint8Array;
    asNodeBuffer(): Buffer;
}

interface JSZipFileOptions extends JSZipObjectOptions {
    compressionOptions?:Object;
    comment?: string;
    optimizedBinaryString?: boolean;
    createFolders?: boolean;
    unixPermissions?:number;
    dosPermissions?:number;
}

interface JSZipObjectOptions {
    base64?: boolean;
    binary?: boolean;
    dir?: boolean;
    date?: Date;
    compression?: string;
}

interface JSZipGeneratorOptions {
    base64?: boolean;
    compression?: string;
    compressionOptions?:Object;
    type?: string;
    comment?: string;
    mimeType?:string;
    platform?:string;
}

interface JSZipLoadOptions {
    base64?: boolean;
    checkCRC32?: boolean;
    optimizedBinaryString?: boolean;
    createFolders?: boolean;
}

interface JSZipSupport {
    arraybuffer: boolean;
    uint8array: boolean;
    blob: boolean;
    nodebuffer: boolean;
}

interface Buffer {
    data?:any;
    encoding?:string;
}

interface DEFLATE {
    compress(input:string, compressionOptions:{level:number}): Uint8Array;
    compress(input:number[], compressionOptions:{level:number}): Uint8Array;
    compress(input:Uint8Array, compressionOptions:{level:number}): Uint8Array;

    uncompress(input:string): Uint8Array;
    uncompress(input:number[]): Uint8Array;
    uncompress(input:Uint8Array): Uint8Array;
}

declare var JSZip:{
    (): JSZip;
    (data:any, options?:JSZipLoadOptions): JSZip;
    new (): JSZip;
    new (data:any, options?:JSZipLoadOptions): JSZip;

    prototype: JSZip;
    support: JSZipSupport;
    compressions: {
        DEFLATE: DEFLATE;
    }
}

declare module "jszip" {
    export = JSZip;
}

interface FileSaver {
    (data:Blob, filename:string): void
}

declare var saveAs:FileSaver;