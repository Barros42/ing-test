export default class IngError {

    constructor(
        private readonly shortMessage: string,
        private readonly longMessage: string,
        private readonly errorCode: string
    ){}

    toString(): string{
        return JSON.stringify(this);
    }

}