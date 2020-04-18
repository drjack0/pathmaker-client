import {Storage} from "aws-amplify";

export async function s3UploadAutorizzazione(file,censcode,cognome,nome){
    const filename = `autorizzazioni/Autorizzazione-${censcode}-${cognome}-${nome}`;
    
    const stored = await Storage.put(filename, file, {
        contentType: file.type
    });
    console.log(stored);
    return stored.key
}

export async function s3UploadCensimento(file,censcode,nome,cognome){
    const filename = `censimenti/Censimento-${censcode}-${cognome}-${nome}`;
    
    const stored = await Storage.put(filename, file, {
        contentType: file.type
    });
    return stored.key
}

export async function s3UploadPrivacy(file,censcode,nome,cognome){
    const filename = `privacy/Privacy-${censcode}-${cognome}-${nome}`;
    
    const stored = await Storage.put(filename, file, {
        contentType: file.type
    });
    return stored.key
}

export async function s3UploadSS(file,censcode,nome,cognome){
    const filename = `schede/SS-${censcode}-${cognome}-${nome}`;
    
    const stored = await Storage.put(filename, file, {
        contentType: file.type
    });
    return stored.key
}

export async function s3UploadTS(file,censcode,nome,cognome){
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