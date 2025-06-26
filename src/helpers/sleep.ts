export const sleep = (miliseconds: number) => {
 return new Promise( res => {
    setTimeout(() => {
        res(true)
    }, miliseconds);
 });
}