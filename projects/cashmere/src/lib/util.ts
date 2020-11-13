import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

export function parseBooleanAttribute(value: boolean | string): boolean {
    if (typeof value === 'boolean') {
        return value;
    }
    if (value.toLowerCase() === 'false') {
        return false;
    }
    if (value.toLowerCase() === 'true' || value === '') {
        return true;
    }
    throw Error(String(value) + ' is not a boolean value');
}

/* Open Source `take-until-destroy` operator from: https://github.com/NetanelBasal/ngx-take-until-destroy */

export const untilDestroyed = (componentInstance, destroyMethodName = 'ngOnDestroy') => <T>(source: Observable<T>) => {
    const originalDestroy = componentInstance[destroyMethodName];
    if (isFunction(originalDestroy) === false) {
        throw new Error(`${componentInstance.constructor.name} is using untilDestroyed but doesn't implement ${destroyMethodName}`);
    }
    if (!componentInstance['__takeUntilDestroy']) {
        componentInstance['__takeUntilDestroy'] = new Subject();

        componentInstance[destroyMethodName] = function() {
            isFunction(originalDestroy) && originalDestroy.apply(this, arguments);
            componentInstance['__takeUntilDestroy'].next(true);
            componentInstance['__takeUntilDestroy'].complete();
        };
    }
    return source.pipe(takeUntil<T>(componentInstance['__takeUntilDestroy']));
};

export function isFunction(value: any) {
    return typeof value === 'function';
}

export function isDefined(value: any) {
    return value !== undefined && value !== null;
}

export function isObject(value: any) {
    return typeof value === 'object' && isDefined(value);
}

export function isPromise(value: any) {
    return value instanceof Promise;
}

const unescapedHTMLExp = /[&<>"']/g;
const hasUnescapedHTMLExp = RegExp(unescapedHTMLExp.source);
const htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#39;'
};

export function escapeHTML(string: string) {
    return (string && hasUnescapedHTMLExp.test(string)) ?
        string.replace(unescapedHTMLExp, chr => htmlEscapes[chr]) :
        string;
}

/** generate random Ids */
export function newId() {
    // First character is an 'a', it's good practice for unique id to begin with a letter
    return 'axxxxxxxxxxx'.replace(/[x]/g, function (_) {
        // tslint:disable-next-line:no-bitwise
        const val = Math.random() * 16 | 0;
        return val.toString(16);
    });
}
