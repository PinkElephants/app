import {WindowRefService} from './window.service';
import {Injectable} from '@angular/core';

@Injectable()
export class UtilsService {
  private window: any;
  constructor(windowRef: WindowRefService) {
    this.window = windowRef.nativeWindow;
  }
  public isFunction(obj) {
    return Object.prototype.toString.call(obj) === '[object Function]';
  }

  public isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  }
  public uniq(array) {
    const result = [];
    for (let i = 0; i < array.length; ++i) {
      if (result.indexOf(array[i]) === -1) {
        result.push(array[i]);
      }
    }
    return result;
  }

  public ajx2q(qa) {
    const query = [],
      enc = function (str) {
        if ((window as any)._decodeEr && (window as any)._decodeEr[str]) {
          return str;
        }
        try {
          return encodeURIComponent(str);
        } catch (e) {
          return str;
        }
      };

    for (const key in qa) {
      if (qa[key] == null || this.isFunction(qa[key])) {
        continue;
      }
      if (this.isArray(qa[key])) {
        for (let i = 0, c = 0, l = qa[key].length; i < l; ++i) {
          if (qa[key][i] == null || this.isFunction(qa[key][i])) {
            continue;
          }
          query.push(enc(key) + '[' + c + ']=' + enc(qa[key][i]));
          ++c;
        }
      } else {
        query.push(enc(key) + '=' + enc(qa[key]));
      }
    }
    query.sort();
    return query.join('&');
  }

  public q2ajx(qa) {
    if (!qa) {
      return {};
    }
    const query = {},
      dec = function (str) {
        try {
          return decodeURIComponent(str);
        } catch (e) {
          (window as any)._decodeEr = (window  as any)._decodeEr || {};
          (window as any)._decodeEr[str] = 1;
          return str;
        }
      };
    qa = qa.split('&');
    qa.forEach(function (a, i) {
      const t = a.split('=');
      if (t[0]) {
        if (t[1]) {
          const v = dec(t[1] + '');
          if (t[0].substr(t.length - 2) === '[]') {
            const k = dec(t[0].substr(0, t.length - 2));
            if (!query[k]) {
              query[k] = [];
            }
            query[k].push(v);
          } else {
            query[dec(t[0])] = v;
          }
        } else {
          query[dec(t[0])] = t[1];
        }

      }
    });
    return query;
  }
  public applyTemplate(template, replacements) {
    return template.replace(/{(\w+)}/g, function (e, n) {
      return undefined !== replacements[n] ? encodeURIComponent(replacements[n]) : '';
    });
  }

}
