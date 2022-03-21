export class AppConfig {
  public static changeLayout() {
    let {lang, direction} = {lang: 'en', direction: 'ltr'};

    if(localStorage.getItem("layout") !== null){
      let layout = JSON.parse(String(localStorage.getItem("layout")));
      lang = layout.lang;
      direction = layout.direction;
    }

    const htmlTag = document.getElementsByTagName("html")[0] as HTMLHtmlElement;
    htmlTag.dir = direction;
    htmlTag.lang = lang;
  }
}
