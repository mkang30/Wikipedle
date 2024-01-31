import { CookieManager } from "./services/CookieManager";

let cookieManager: CookieManager;
beforeEach(() => {
    cookieManager = new CookieManager();
});

test('test cookie manager 1', async () => {
    cookieManager.setCookie('test', 'test');
    expect(cookieManager.getCookie('test')).toBe('test');
    cookieManager.deleteCookie('test');
    expect(cookieManager.getCookie('test')).toBe(null);
});

test('test cookie manager 2', async () => {
    cookieManager.setCookie('12345', '12345');
    expect(cookieManager.getCookie('12345')).toBe('12345');
    cookieManager.deleteCookie('12345');
    expect(cookieManager.getCookie('12345')).toBe(null);
});