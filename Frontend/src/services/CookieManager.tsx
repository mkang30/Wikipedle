export class CookieManager {
  private readonly COOKIE_EXPIRATION_DAYS = 400;

  public setCookie(name: string, value: string): void {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + this.COOKIE_EXPIRATION_DAYS);
    const cookieValue = encodeURIComponent(value) + "; expires=" + expirationDate.toUTCString() + "; path=/";
    document.cookie = name + "=" + cookieValue;
  }

  public getCookie(name: string): string | null {
    const cookieName = name + "=";
    const cookieArray = document.cookie.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) === 0) {
        return decodeURIComponent(cookie.substring(cookieName.length, cookie.length));
      }
    }
    return null;
  }

  public deleteCookie(name: string): void {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() - 1);
    document.cookie = name + "=; expires=" + expirationDate.toUTCString() + "; path=/";
  }
}