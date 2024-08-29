/**
 * @fileoverview added by tsickle
 * Generated from: lib/autocomplete/highlight.pipe.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __assign } from "tslib";
import { Pipe } from '@angular/core';
var HighlightPipe = /** @class */ (function () {
    function HighlightPipe() {
    }
    /**
     * @param {?} text
     * @param {?} search
     * @param {?=} searchKeyword
     * @return {?}
     */
    HighlightPipe.prototype.transform = /**
     * @param {?} text
     * @param {?} search
     * @param {?=} searchKeyword
     * @return {?}
     */
    function (text, search, searchKeyword) {
        /** @type {?} */
        var pattern = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
        pattern = pattern.split(' ').filter((/**
         * @param {?} t
         * @return {?}
         */
        function (t) {
            return t.length > 0;
        })).join('|');
        /** @type {?} */
        var regex = new RegExp(pattern, 'gi');
        if (!search) {
            return text;
        }
        if (searchKeyword) {
            /** @type {?} */
            var name_1 = text[searchKeyword].replace(regex, (/**
             * @param {?} match
             * @return {?}
             */
            function (match) { return "<b>" + match + "</b>"; }));
            // copy original object
            /** @type {?} */
            var text2 = __assign({}, text);
            // set bold value into searchKeyword of copied object
            text2[searchKeyword] = name_1;
            return text2;
        }
        else {
            return search ? text.replace(regex, (/**
             * @param {?} match
             * @return {?}
             */
            function (match) { return "<b>" + match + "</b>"; })) : text;
        }
    };
    HighlightPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'highlight'
                },] }
    ];
    return HighlightPipe;
}());
export { HighlightPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0LnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW5nLWF1dG9jb21wbGV0ZS8iLCJzb3VyY2VzIjpbImxpYi9hdXRvY29tcGxldGUvaGlnaGxpZ2h0LnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLElBQUksRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFFbEQ7SUFBQTtJQTBCQSxDQUFDOzs7Ozs7O0lBdEJDLGlDQUFTOzs7Ozs7SUFBVCxVQUFVLElBQVMsRUFBRSxNQUFXLEVBQUUsYUFBbUI7O1lBQy9DLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLHFDQUFxQyxFQUFFLE1BQU0sQ0FBQztRQUMzRSxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNOzs7O1FBQUMsVUFBQyxDQUFDO1lBQ3BDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDdEIsQ0FBQyxFQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztZQUNQLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDO1FBRXZDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsSUFBSSxhQUFhLEVBQUU7O2dCQUNYLE1BQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUs7Ozs7WUFBRSxVQUFDLEtBQUssSUFBSyxPQUFBLFFBQU0sS0FBSyxTQUFNLEVBQWpCLENBQWlCLEVBQUM7OztnQkFFdkUsS0FBSyxnQkFBTyxJQUFJLENBQUM7WUFDdkIscURBQXFEO1lBQ3JELEtBQUssQ0FBQyxhQUFhLENBQUMsR0FBRyxNQUFJLENBQUM7WUFDNUIsT0FBTyxLQUFLLENBQUM7U0FDZDthQUFNO1lBQ0wsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSzs7OztZQUFFLFVBQUMsS0FBSyxJQUFLLE9BQUEsUUFBTSxLQUFLLFNBQU0sRUFBakIsQ0FBaUIsRUFBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7U0FDMUU7SUFDSCxDQUFDOztnQkF6QkYsSUFBSSxTQUFDO29CQUNKLElBQUksRUFBRSxXQUFXO2lCQUNsQjs7SUF3QkQsb0JBQUM7Q0FBQSxBQTFCRCxJQTBCQztTQXZCWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtQaXBlLCBQaXBlVHJhbnNmb3JtfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoe1xuICBuYW1lOiAnaGlnaGxpZ2h0J1xufSlcbmV4cG9ydCBjbGFzcyBIaWdobGlnaHRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybSh0ZXh0OiBhbnksIHNlYXJjaDogYW55LCBzZWFyY2hLZXl3b3JkPzogYW55KTogYW55IHtcbiAgICBsZXQgcGF0dGVybiA9IHNlYXJjaC5yZXBsYWNlKC9bXFwtXFxbXFxdXFwvXFx7XFx9XFwoXFwpXFwqXFwrXFw/XFwuXFxcXFxcXlxcJFxcfF0vZywgJ1xcXFwkJicpO1xuICAgIHBhdHRlcm4gPSBwYXR0ZXJuLnNwbGl0KCcgJykuZmlsdGVyKCh0KSA9PiB7XG4gICAgICByZXR1cm4gdC5sZW5ndGggPiAwO1xuICAgIH0pLmpvaW4oJ3wnKTtcbiAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAocGF0dGVybiwgJ2dpJyk7XG5cbiAgICBpZiAoIXNlYXJjaCkge1xuICAgICAgcmV0dXJuIHRleHQ7XG4gICAgfVxuXG4gICAgaWYgKHNlYXJjaEtleXdvcmQpIHtcbiAgICAgIGNvbnN0IG5hbWUgPSB0ZXh0W3NlYXJjaEtleXdvcmRdLnJlcGxhY2UocmVnZXgsIChtYXRjaCkgPT4gYDxiPiR7bWF0Y2h9PC9iPmApO1xuICAgICAgLy8gY29weSBvcmlnaW5hbCBvYmplY3RcbiAgICAgIGNvbnN0IHRleHQyID0gey4uLnRleHR9O1xuICAgICAgLy8gc2V0IGJvbGQgdmFsdWUgaW50byBzZWFyY2hLZXl3b3JkIG9mIGNvcGllZCBvYmplY3RcbiAgICAgIHRleHQyW3NlYXJjaEtleXdvcmRdID0gbmFtZTtcbiAgICAgIHJldHVybiB0ZXh0MjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHNlYXJjaCA/IHRleHQucmVwbGFjZShyZWdleCwgKG1hdGNoKSA9PiBgPGI+JHttYXRjaH08L2I+YCkgOiB0ZXh0O1xuICAgIH1cbiAgfVxufVxuIl19