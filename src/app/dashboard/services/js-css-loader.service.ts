import { Injectable } from '@angular/core';
declare const Choices: any;
@Injectable({
  providedIn: 'root'
})
export class JsCssLoaderService {

  constructor() { }
    // Load a script dynamically
    loadScript(src: string): Promise<any> {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.type = 'text/javascript';
        script.async = true;
        script.onload = () => resolve(true);
        script.onerror = (error: any) => reject(error);
        document.body.appendChild(script);
      });
    }

    // Load multiple scripts
    loadScripts(scripts: string[]): Promise<any> {
      const promises = scripts.map(script => this.loadScript(script));

      return Promise.all(promises);
    }
    loadCSS(href: string): Promise<any> {
      return new Promise((resolve, reject) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.onload = () => resolve(true);
        link.onerror = (error: any) => reject(error);
        document.head.appendChild(link);
      });
    }

    // Load multiple CSS files
    loadCSSFiles(files: string[]): Promise<any> {
      const promises = files.map(file => this.loadCSS(file));

      return Promise.all(promises);
    }
}
