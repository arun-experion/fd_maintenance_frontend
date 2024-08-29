/**
 * @fileoverview added by tsickle
 * Generated from: lib/autocomplete/highlight.pipe.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
export class HighlightPipe {
    /**
     * @param {?} text
     * @param {?} search
     * @param {?=} searchKeyword
     * @return {?}
     */
    transform(text, search, searchKeyword) {
        /** @type {?} */
        let pattern = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
        pattern = pattern.split(' ').filter((/**
         * @param {?} t
         * @return {?}
         */
        (t) => {
            return t.length > 0;
        })).join('|');
        /** @type {?} */
        const regex = new RegExp(pattern, 'gi');
        if (!search) {
            return text;
        }
        if (searchKeyword) {
            /** @type {?} */
            const name = text[searchKeyword].replace(regex, (/**
             * @param {?} match
             * @return {?}
             */
            (match) => `<b>${match}</b>`));
            // copy original object
            /** @type {?} */
            const text2 = Object.assign({}, text);
            // set bold value into searchKeyword of copied object
            text2[searchKeyword] = name;
            return text2;
        }
        else {
            return search ? text.replace(regex, (/**
             * @param {?} match
             * @return {?}
             */
            (match) => `<b>${match}</b>`)) : text;
        }
    }
}
HighlightPipe.decorators = [
    { type: Pipe, args: [{
                name: 'highlight'
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0LnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW5nLWF1dG9jb21wbGV0ZS8iLCJzb3VyY2VzIjpbImxpYi9hdXRvY29tcGxldGUvaGlnaGxpZ2h0LnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUMsSUFBSSxFQUFnQixNQUFNLGVBQWUsQ0FBQztBQUtsRCxNQUFNLE9BQU8sYUFBYTs7Ozs7OztJQUN4QixTQUFTLENBQUMsSUFBUyxFQUFFLE1BQVcsRUFBRSxhQUFtQjs7WUFDL0MsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMscUNBQXFDLEVBQUUsTUFBTSxDQUFDO1FBQzNFLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU07Ozs7UUFBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ3hDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDdEIsQ0FBQyxFQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztjQUNQLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDO1FBRXZDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsSUFBSSxhQUFhLEVBQUU7O2tCQUNYLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUs7Ozs7WUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsTUFBTSxLQUFLLE1BQU0sRUFBQzs7O2tCQUV2RSxLQUFLLHFCQUFPLElBQUksQ0FBQztZQUN2QixxREFBcUQ7WUFDckQsS0FBSyxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUM1QixPQUFPLEtBQUssQ0FBQztTQUNkO2FBQU07WUFDTCxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLOzs7O1lBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLE1BQU0sS0FBSyxNQUFNLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1NBQzFFO0lBQ0gsQ0FBQzs7O1lBekJGLElBQUksU0FBQztnQkFDSixJQUFJLEVBQUUsV0FBVzthQUNsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UGlwZSwgUGlwZVRyYW5zZm9ybX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2hpZ2hsaWdodCdcbn0pXG5leHBvcnQgY2xhc3MgSGlnaGxpZ2h0UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0odGV4dDogYW55LCBzZWFyY2g6IGFueSwgc2VhcmNoS2V5d29yZD86IGFueSk6IGFueSB7XG4gICAgbGV0IHBhdHRlcm4gPSBzZWFyY2gucmVwbGFjZSgvW1xcLVxcW1xcXVxcL1xce1xcfVxcKFxcKVxcKlxcK1xcP1xcLlxcXFxcXF5cXCRcXHxdL2csICdcXFxcJCYnKTtcbiAgICBwYXR0ZXJuID0gcGF0dGVybi5zcGxpdCgnICcpLmZpbHRlcigodCkgPT4ge1xuICAgICAgcmV0dXJuIHQubGVuZ3RoID4gMDtcbiAgICB9KS5qb2luKCd8Jyk7XG4gICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKHBhdHRlcm4sICdnaScpO1xuXG4gICAgaWYgKCFzZWFyY2gpIHtcbiAgICAgIHJldHVybiB0ZXh0O1xuICAgIH1cblxuICAgIGlmIChzZWFyY2hLZXl3b3JkKSB7XG4gICAgICBjb25zdCBuYW1lID0gdGV4dFtzZWFyY2hLZXl3b3JkXS5yZXBsYWNlKHJlZ2V4LCAobWF0Y2gpID0+IGA8Yj4ke21hdGNofTwvYj5gKTtcbiAgICAgIC8vIGNvcHkgb3JpZ2luYWwgb2JqZWN0XG4gICAgICBjb25zdCB0ZXh0MiA9IHsuLi50ZXh0fTtcbiAgICAgIC8vIHNldCBib2xkIHZhbHVlIGludG8gc2VhcmNoS2V5d29yZCBvZiBjb3BpZWQgb2JqZWN0XG4gICAgICB0ZXh0MltzZWFyY2hLZXl3b3JkXSA9IG5hbWU7XG4gICAgICByZXR1cm4gdGV4dDI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBzZWFyY2ggPyB0ZXh0LnJlcGxhY2UocmVnZXgsIChtYXRjaCkgPT4gYDxiPiR7bWF0Y2h9PC9iPmApIDogdGV4dDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==