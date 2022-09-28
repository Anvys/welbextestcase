export enum StatusCodes {
    Ok = 200,
    Created = 201,
    Accepted = 202,
    LoginSuccess = 203,


    badRequest = 420,
    badId = 421,
    notFound = 422,
    duplicateFound = 423,
    multipleFound = 424,
    unknownError = 499,
}

export enum ExprCodes {
    include = 0,
    equal = 1,
    more = 2,
    less = 3,
}