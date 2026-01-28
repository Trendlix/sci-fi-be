const responseFormatter = (status: number, message: string, data?: any) => ({
    ok: status >= 200 && status < 300,
    status,
    message,
    data
});
export default responseFormatter;
