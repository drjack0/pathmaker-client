//Some Functions with amplify library

import {Storage} from "aws-amplify";

export async function s3UploadAutorizzazione(file,censcode,cognome,nome){
    const filename = `autorizzazioni/Autorizzazione-${censcode}-${cognome}-${nome}`;
    
    const stored = await Storage.put(filename, file, {
        contentType: file.type
    });
    return stored.key
}

export async function s3UploadCensimento(file,censcode,cognome,nome){
    const filename = `censimenti/Censimento-${censcode}-${cognome}-${nome}`;
    
    const stored = await Storage.put(filename, file, {
        contentType: file.type
    });
    return stored.key
}

export async function s3UploadPrivacy(file,censcode,cognome,nome){
    const filename = `privacy/Privacy-${censcode}-${cognome}-${nome}`;
    
    const stored = await Storage.put(filename, file, {
        contentType: file.type
    });
    return stored.key
}

export async function s3UploadSS(file,censcode,cognome,nome){
    const filename = `schede/SS-${censcode}-${cognome}-${nome}`;
    
    const stored = await Storage.put(filename, file, {
        contentType: file.type
    });
    return stored.key
}

export async function s3UploadTS(file,censcode,cognome,nome){
    const filename = `tessere/TS-${censcode}-${cognome}-${nome}`;
    
    const stored = await Storage.put(filename, file, {
        contentType: file.type
    });
    return stored.key
}

export async function s3UploadSq(file,squad){
    const filename = `imgSquad/IMG-${squad}`;

    const stored = await Storage.put(filename, file, {
        contentType: file.type
    });
    return stored.key
}

export async function s3UploadCSV(file){
    const filename = "csv/IMPORT-CSV";
    const stored = await Storage.put(filename,file,{
        contentType: file.type
    });
    return stored.key
}

export async function s3UploadMainCSV(file){
    const filename = "MAIN.csv";
    const stored = await Storage.put(filename,file);
    return stored.key
}