/**
 * @fileoverview added by tsickle
 * Generated from: lib/autocomplete/autocomplete.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __read, __spread } from "tslib";
import { Component, ContentChild, ElementRef, EventEmitter, forwardRef, Input, Output, Renderer2, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, filter, map } from 'rxjs/operators';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
/**
 * Keyboard events
 * @type {?}
 */
var isArrowUp = (/**
 * @param {?} keyCode
 * @return {?}
 */
function (keyCode) { return keyCode === 38; });
var ɵ0 = isArrowUp;
/** @type {?} */
var isArrowDown = (/**
 * @param {?} keyCode
 * @return {?}
 */
function (keyCode) { return keyCode === 40; });
var ɵ1 = isArrowDown;
/** @type {?} */
var isArrowUpDown = (/**
 * @param {?} keyCode
 * @return {?}
 */
function (keyCode) { return isArrowUp(keyCode) || isArrowDown(keyCode); });
var ɵ2 = isArrowUpDown;
/** @type {?} */
var isEnter = (/**
 * @param {?} keyCode
 * @return {?}
 */
function (keyCode) { return keyCode === 13; });
var ɵ3 = isEnter;
/** @type {?} */
var isBackspace = (/**
 * @param {?} keyCode
 * @return {?}
 */
function (keyCode) { return keyCode === 8; });
var ɵ4 = isBackspace;
/** @type {?} */
var isDelete = (/**
 * @param {?} keyCode
 * @return {?}
 */
function (keyCode) { return keyCode === 46; });
var ɵ5 = isDelete;
/** @type {?} */
var isESC = (/**
 * @param {?} keyCode
 * @return {?}
 */
function (keyCode) { return keyCode === 27; });
var ɵ6 = isESC;
/** @type {?} */
var isTab = (/**
 * @param {?} keyCode
 * @return {?}
 */
function (keyCode) { return keyCode === 9; });
var ɵ7 = isTab;
var AutocompleteComponent = /** @class */ (function () {
    function AutocompleteComponent(elementRef, renderer) {
        this.renderer = renderer;
        // input events
        this.query = ''; // search query
        // search query
        this.filteredList = []; // list of items
        // list of items
        this.historyList = []; // list of history items
        // list of history items
        this.isHistoryListVisible = true;
        this.selectedIdx = -1;
        this.toHighlight = '';
        this.notFound = false;
        this.isFocused = false;
        this.isOpen = false;
        this.isScrollToEnd = false;
        this.overlay = false;
        this.manualOpen = undefined;
        this.manualClose = undefined;
        // @Inputs
        /**
         * Data of items list.
         * It can be array of strings or array of objects.
         */
        this.data = [];
        // keyword to filter the list
        this.placeHolder = ''; // input placeholder
        // input placeholder
        this.heading = '';
        /**
         * Heading text of history list.
         * If it is null then history heading is hidden.
         */
        this.historyHeading = 'Recently selected';
        this.historyListMaxNumber = 15; // maximum number of items in the history list.
        // maximum number of items in the history list.
        this.notFoundText = 'Not found'; // set custom text when filter returns empty result
        // input disable/enable
        /**
         * The minimum number of characters the user must type before a search is performed.
         */
        this.minQueryLength = 1;
        // @Output events
        /**
         * Event that is emitted whenever an item from the list is selected.
         */
        this.selected = new EventEmitter();
        /**
         * Event that is emitted whenever an input is changed.
         */
        this.inputChanged = new EventEmitter();
        /**
         * Event that is emitted whenever an input is focused.
         */
        this.inputFocused = new EventEmitter();
        /**
         * Event that is emitted whenever an input is cleared.
         */
        this.inputCleared = new EventEmitter();
        /**
         * Event that is emitted when the autocomplete panel is opened.
         */
        this.opened = new EventEmitter();
        /**
         * Event that is emitted when the autocomplete panel is closed.
         */
        this.closed = new EventEmitter();
        /**
         * Event that is emitted when scrolled to the end of items.
         */
        this.scrolledToEnd = new EventEmitter();
        /**
         * Propagates new value when model changes
         */
        this.propagateChange = (/**
         * @return {?}
         */
        function () {
        });
        this.elementRef = elementRef;
    }
    /**
     * Writes a new value from the form model into the view,
     * Updates model
     */
    /**
     * Writes a new value from the form model into the view,
     * Updates model
     * @param {?} value
     * @return {?}
     */
    AutocompleteComponent.prototype.writeValue = /**
     * Writes a new value from the form model into the view,
     * Updates model
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.query = value;
    };
    /**
     * Registers a handler that is called when something in the view has changed
     */
    /**
     * Registers a handler that is called when something in the view has changed
     * @param {?} fn
     * @return {?}
     */
    AutocompleteComponent.prototype.registerOnChange = /**
     * Registers a handler that is called when something in the view has changed
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.propagateChange = fn;
    };
    /**
     * Registers a handler specifically for when a control receives a touch event
     */
    /**
     * Registers a handler specifically for when a control receives a touch event
     * @param {?} fn
     * @return {?}
     */
    AutocompleteComponent.prototype.registerOnTouched = /**
     * Registers a handler specifically for when a control receives a touch event
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
    };
    /**
     * Event that is called when the value of an input element is changed
     */
    /**
     * Event that is called when the value of an input element is changed
     * @param {?} event
     * @return {?}
     */
    AutocompleteComponent.prototype.onChange = /**
     * Event that is called when the value of an input element is changed
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.propagateChange(event.target.value);
    };
    /**
     * Event that is called when the control status changes to or from DISABLED
     */
    /**
     * Event that is called when the control status changes to or from DISABLED
     * @param {?} isDisabled
     * @return {?}
     */
    AutocompleteComponent.prototype.setDisabledState = /**
     * Event that is called when the control status changes to or from DISABLED
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @return {?}
     */
    AutocompleteComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.setInitialValue(this.initialValue);
    };
    /**
     * @return {?}
     */
    AutocompleteComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.initEventStream();
        this.handleScroll();
    };
    /**
     * Set initial value
     * @param value
     */
    /**
     * Set initial value
     * @param {?} value
     * @return {?}
     */
    AutocompleteComponent.prototype.setInitialValue = /**
     * Set initial value
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.initialValue) {
            this.select(value);
        }
    };
    /**
     * Update search results
     */
    /**
     * Update search results
     * @param {?} changes
     * @return {?}
     */
    AutocompleteComponent.prototype.ngOnChanges = /**
     * Update search results
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes &&
            changes.data &&
            Array.isArray(changes.data.currentValue)) {
            this.handleItemsChange();
            if (!changes.data.firstChange && this.isFocused) {
                this.handleOpen();
            }
        }
    };
    /**
     * Items change
     */
    /**
     * Items change
     * @return {?}
     */
    AutocompleteComponent.prototype.handleItemsChange = /**
     * Items change
     * @return {?}
     */
    function () {
        this.isScrollToEnd = false;
        if (!this.isOpen) {
            return;
        }
        this.filteredList = this.data;
        this.notFound = !this.filteredList || this.filteredList.length === 0;
    };
    /**
     * Filter data
     */
    /**
     * Filter data
     * @return {?}
     */
    AutocompleteComponent.prototype.filterList = /**
     * Filter data
     * @return {?}
     */
    function () {
        var _this = this;
        this.selectedIdx = -1;
        this.initSearchHistory();
        if (this.query != null && this.data) {
            this.toHighlight = this.query;
            this.filteredList = this.data.filter((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                if (typeof item === 'string') {
                    // string logic, check equality of strings
                    return item.toLowerCase().indexOf(_this.query.toLowerCase()) > -1;
                }
                else if (typeof item === 'object' && item.constructor === Object) {
                    // object logic, check property equality
                    return item[_this.searchKeyword].toLowerCase().indexOf(_this.query.toLowerCase()) > -1;
                }
            }));
        }
        else {
            this.notFound = false;
        }
    };
    /**
     * Check type of item in the list.
     * @param item
     */
    /**
     * Check type of item in the list.
     * @param {?} item
     * @return {?}
     */
    AutocompleteComponent.prototype.isType = /**
     * Check type of item in the list.
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return typeof item === 'string';
    };
    /**
     * Select item in the list.
     * @param item
     */
    /**
     * Select item in the list.
     * @param {?} item
     * @return {?}
     */
    AutocompleteComponent.prototype.select = /**
     * Select item in the list.
     * @param {?} item
     * @return {?}
     */
    function (item) {
        var _this = this;
        this.query = !this.isType(item) ? item[this.searchKeyword] : item;
        this.isOpen = true;
        this.overlay = false;
        this.selected.emit(item);
        this.propagateChange(item);
        if (this.initialValue) {
            // check if history already exists in localStorage and then update
            /** @type {?} */
            var history_1 = window.localStorage.getItem("" + this.historyIdentifier);
            if (history_1) {
                /** @type {?} */
                var existingHistory = JSON.parse(localStorage["" + this.historyIdentifier]);
                if (!(existingHistory instanceof Array))
                    existingHistory = [];
                // check if selected item exists in existingHistory
                if (!existingHistory.some((/**
                 * @param {?} existingItem
                 * @return {?}
                 */
                function (existingItem) { return !_this.isType(existingItem)
                    ? existingItem[_this.searchKeyword] == item[_this.searchKeyword] : existingItem == item; }))) {
                    existingHistory.unshift(item);
                    localStorage.setItem("" + this.historyIdentifier, JSON.stringify(existingHistory));
                    // check if items don't exceed max allowed number
                    if (existingHistory.length >= this.historyListMaxNumber) {
                        existingHistory.splice(existingHistory.length - 1, 1);
                        localStorage.setItem("" + this.historyIdentifier, JSON.stringify(existingHistory));
                    }
                }
                else {
                    // if selected item exists in existingHistory swap to top in array
                    if (!this.isType(item)) {
                        // object logic
                        /** @type {?} */
                        var copiedExistingHistory = existingHistory.slice();
                        // copy original existingHistory array
                        /** @type {?} */
                        var selectedIndex = copiedExistingHistory.map((/**
                         * @param {?} el
                         * @return {?}
                         */
                        function (el) { return el[_this.searchKeyword]; })).indexOf(item[this.searchKeyword]);
                        copiedExistingHistory.splice(selectedIndex, 1);
                        copiedExistingHistory.splice(0, 0, item);
                        localStorage.setItem("" + this.historyIdentifier, JSON.stringify(copiedExistingHistory));
                    }
                    else {
                        // string logic
                        /** @type {?} */
                        var copiedExistingHistory = existingHistory.slice();
                        copiedExistingHistory.splice(copiedExistingHistory.indexOf(item), 1);
                        copiedExistingHistory.splice(0, 0, item);
                        localStorage.setItem("" + this.historyIdentifier, JSON.stringify(copiedExistingHistory));
                    }
                }
            }
            else {
                this.saveHistory(item);
            }
        }
        else {
            this.saveHistory(item);
        }
        this.handleClose();
    };
    /**
     * Document click
     * @param e event
     */
    /**
     * Document click
     * @param {?} e event
     * @return {?}
     */
    AutocompleteComponent.prototype.handleClick = /**
     * Document click
     * @param {?} e event
     * @return {?}
     */
    function (e) {
        /** @type {?} */
        var clickedComponent = e.target;
        /** @type {?} */
        var inside = false;
        do {
            if (clickedComponent === this.elementRef.nativeElement) {
                inside = true;
                if (this.filteredList.length) {
                    this.handleOpen();
                }
            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
        if (!inside) {
            this.handleClose();
        }
    };
    /**
     * Handle body overlay
     */
    /**
     * Handle body overlay
     * @return {?}
     */
    AutocompleteComponent.prototype.handleOverlay = /**
     * Handle body overlay
     * @return {?}
     */
    function () {
        this.overlay = false;
    };
    /**
     * Scroll items
     */
    /**
     * Scroll items
     * @return {?}
     */
    AutocompleteComponent.prototype.handleScroll = /**
     * Scroll items
     * @return {?}
     */
    function () {
        var _this = this;
        this.renderer.listen(this.filteredListElement.nativeElement, 'scroll', (/**
         * @return {?}
         */
        function () {
            _this.scrollToEnd();
        }));
    };
    /**
     * Define panel state
     */
    /**
     * Define panel state
     * @param {?} event
     * @return {?}
     */
    AutocompleteComponent.prototype.setPanelState = /**
     * Define panel state
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event) {
            event.stopPropagation();
        }
        // If controls are untouched
        if (typeof this.manualOpen === 'undefined'
            && typeof this.manualClose === 'undefined') {
            this.isOpen = false;
            this.handleOpen();
        }
        // If one of the controls is untouched and other is deactivated
        if (typeof this.manualOpen === 'undefined'
            && this.manualClose === false
            || typeof this.manualClose === 'undefined'
                && this.manualOpen === false) {
            this.isOpen = false;
            this.handleOpen();
        }
        // if controls are touched but both are deactivated
        if (this.manualOpen === false && this.manualClose === false) {
            this.isOpen = false;
            this.handleOpen();
        }
        // if open control is touched and activated
        if (this.manualOpen) {
            this.isOpen = false;
            this.handleOpen();
            this.manualOpen = false;
        }
        // if close control is touched and activated
        if (this.manualClose) {
            this.isOpen = true;
            this.handleClose();
            this.manualClose = false;
        }
    };
    /**
     * Manual controls
     */
    /**
     * Manual controls
     * @return {?}
     */
    AutocompleteComponent.prototype.open = /**
     * Manual controls
     * @return {?}
     */
    function () {
        this.manualOpen = true;
        this.isOpen = false;
        this.handleOpen();
    };
    /**
     * @return {?}
     */
    AutocompleteComponent.prototype.close = /**
     * @return {?}
     */
    function () {
        this.manualClose = true;
        this.isOpen = true;
        this.handleClose();
    };
    /**
     * @return {?}
     */
    AutocompleteComponent.prototype.focus = /**
     * @return {?}
     */
    function () {
        this.handleFocus(event);
    };
    /**
     * @return {?}
     */
    AutocompleteComponent.prototype.clear = /**
     * @return {?}
     */
    function () {
        this.remove(event);
    };
    /**
     * Remove search query
     */
    /**
     * Remove search query
     * @param {?} e
     * @return {?}
     */
    AutocompleteComponent.prototype.remove = /**
     * Remove search query
     * @param {?} e
     * @return {?}
     */
    function (e) {
        e.stopPropagation();
        this.query = '';
        this.inputCleared.emit();
        this.propagateChange(this.query);
        this.setPanelState(e);
    };
    /**
     * Initialize historyList search
     */
    /**
     * Initialize historyList search
     * @return {?}
     */
    AutocompleteComponent.prototype.initSearchHistory = /**
     * Initialize historyList search
     * @return {?}
     */
    function () {
        this.isHistoryListVisible = false;
        if (this.historyIdentifier && !this.query) {
            /** @type {?} */
            var history_2 = window.localStorage.getItem("" + this.historyIdentifier);
            if (history_2) {
                this.isHistoryListVisible = true;
                this.filteredList = [];
                this.historyList = history_2 ? JSON.parse(history_2) : [];
            }
            else {
                this.isHistoryListVisible = false;
            }
        }
        else {
            this.isHistoryListVisible = false;
        }
    };
    /**
     * @return {?}
     */
    AutocompleteComponent.prototype.handleOpen = /**
     * @return {?}
     */
    function () {
        if (this.isOpen || this.isOpen && !this.isLoading) {
            return;
        }
        // If data exists
        if (this.data && this.data.length) {
            this.isOpen = true;
            this.overlay = true;
            this.filterList();
            this.opened.emit();
        }
    };
    /**
     * @return {?}
     */
    AutocompleteComponent.prototype.handleClose = /**
     * @return {?}
     */
    function () {
        if (!this.isOpen) {
            this.isFocused = false;
            return;
        }
        this.isOpen = false;
        this.overlay = false;
        this.filteredList = [];
        this.selectedIdx = -1;
        this.notFound = false;
        this.isHistoryListVisible = false;
        this.isFocused = false;
        this.closed.emit();
    };
    /**
     * @param {?} e
     * @return {?}
     */
    AutocompleteComponent.prototype.handleFocus = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this.searchInput.nativeElement.focus();
        if (this.isFocused) {
            return;
        }
        this.inputFocused.emit(e);
        // if data exists then open
        if (this.data && this.data.length) {
            this.setPanelState(event);
        }
        this.isFocused = true;
    };
    /**
     * @return {?}
     */
    AutocompleteComponent.prototype.scrollToEnd = /**
     * @return {?}
     */
    function () {
        if (this.isScrollToEnd) {
            return;
        }
        /** @type {?} */
        var scrollTop = this.filteredListElement.nativeElement
            .scrollTop;
        /** @type {?} */
        var scrollHeight = this.filteredListElement.nativeElement
            .scrollHeight;
        /** @type {?} */
        var elementHeight = this.filteredListElement.nativeElement
            .clientHeight;
        /** @type {?} */
        var atBottom = scrollHeight === scrollTop + elementHeight;
        if (atBottom) {
            this.scrolledToEnd.emit();
            this.isScrollToEnd = true;
        }
    };
    /**
     * Initialize keyboard events
     */
    /**
     * Initialize keyboard events
     * @return {?}
     */
    AutocompleteComponent.prototype.initEventStream = /**
     * Initialize keyboard events
     * @return {?}
     */
    function () {
        this.inputKeyUp$ = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(map((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return e; })));
        this.inputKeyDown$ = fromEvent(this.searchInput.nativeElement, 'keydown').pipe(map((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return e; })));
        this.listenEventStream();
    };
    /**
     * Listen keyboard events
     */
    /**
     * Listen keyboard events
     * @return {?}
     */
    AutocompleteComponent.prototype.listenEventStream = /**
     * Listen keyboard events
     * @return {?}
     */
    function () {
        var _this = this;
        // key up event
        this.inputKeyUp$
            .pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            return !isArrowUpDown(e.keyCode) &&
                !isEnter(e.keyCode) &&
                !isESC(e.keyCode) &&
                !isTab(e.keyCode);
        })), debounceTime(this.debounceTime)).subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            _this.onKeyUp(e);
        }));
        // cursor up & down
        this.inputKeyDown$.pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return isArrowUpDown(e.keyCode); }))).subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            e.preventDefault();
            _this.onFocusItem(e);
        }));
        // enter keyup
        this.inputKeyUp$.pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return isEnter(e.keyCode); }))).subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            //this.onHandleEnter();
        }));
        // enter keydown
        this.inputKeyDown$.pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return isEnter(e.keyCode); }))).subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            _this.onHandleEnter();
        }));
        // ESC
        this.inputKeyUp$.pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return isESC(e.keyCode); }), debounceTime(100))).subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            _this.onEsc();
        }));
        // TAB
        this.inputKeyDown$.pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return isTab(e.keyCode); }))).subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            _this.onTab();
        }));
        // delete
        this.inputKeyDown$.pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return isBackspace(e.keyCode) || isDelete(e.keyCode); }))).subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            _this.onDelete();
        }));
    };
    /**
     * on keyup == when input changed
     * @param e event
     */
    /**
     * on keyup == when input changed
     * @param {?} e event
     * @return {?}
     */
    AutocompleteComponent.prototype.onKeyUp = /**
     * on keyup == when input changed
     * @param {?} e event
     * @return {?}
     */
    function (e) {
        this.notFound = false; // search results are unknown while typing
        // if input is empty
        if (!this.query) {
            this.notFound = false;
            this.inputChanged.emit(e.target.value);
            this.inputCleared.emit();
            //this.filterList();
            this.setPanelState(e);
        }
        // note that '' can be a valid query
        if (!this.query && this.query !== '') {
            return;
        }
        // if query >= to minQueryLength
        if (this.query.length >= this.minQueryLength) {
            this.inputChanged.emit(e.target.value);
            this.filterList();
            // If no results found
            if (!this.filteredList.length && !this.isLoading) {
                this.notFoundText ? this.notFound = true : this.notFound = false;
            }
        }
    };
    /**
     * Keyboard arrow top and arrow bottom
     * @param e event
     */
    /**
     * Keyboard arrow top and arrow bottom
     * @param {?} e event
     * @return {?}
     */
    AutocompleteComponent.prototype.onFocusItem = /**
     * Keyboard arrow top and arrow bottom
     * @param {?} e event
     * @return {?}
     */
    function (e) {
        // move arrow up and down on filteredList or historyList
        if (!this.historyList.length || !this.isHistoryListVisible) {
            // filteredList
            /** @type {?} */
            var totalNumItem = this.filteredList.length;
            if (e.key === 'ArrowDown') {
                /** @type {?} */
                var sum = this.selectedIdx;
                sum = (this.selectedIdx === null) ? 0 : sum + 1;
                this.selectedIdx = (totalNumItem + sum) % totalNumItem;
                this.scrollToFocusedItem(this.selectedIdx);
            }
            else if (e.key === 'ArrowUp') {
                if (this.selectedIdx == -1) {
                    this.selectedIdx = 0;
                }
                this.selectedIdx = (totalNumItem + this.selectedIdx - 1) % totalNumItem;
                this.scrollToFocusedItem(this.selectedIdx);
            }
        }
        else {
            // historyList
            /** @type {?} */
            var totalNumItem = this.historyList.length;
            if (e.key === 'ArrowDown') {
                /** @type {?} */
                var sum = this.selectedIdx;
                sum = (this.selectedIdx === null) ? 0 : sum + 1;
                this.selectedIdx = (totalNumItem + sum) % totalNumItem;
                this.scrollToFocusedItem(this.selectedIdx);
            }
            else if (e.key === 'ArrowUp') {
                if (this.selectedIdx == -1) {
                    this.selectedIdx = 0;
                }
                this.selectedIdx = (totalNumItem + this.selectedIdx - 1) % totalNumItem;
                this.scrollToFocusedItem(this.selectedIdx);
            }
        }
    };
    /**
     * Scroll to focused item
     * * @param index
     */
    /**
     * Scroll to focused item
     * * \@param index
     * @param {?} index
     * @return {?}
     */
    AutocompleteComponent.prototype.scrollToFocusedItem = /**
     * Scroll to focused item
     * * \@param index
     * @param {?} index
     * @return {?}
     */
    function (index) {
        /** @type {?} */
        var listElement = null;
        // Define list element
        if (!this.historyList.length || !this.isHistoryListVisible) {
            // filteredList element
            listElement = this.filteredListElement.nativeElement;
        }
        else {
            // historyList element
            listElement = this.historyListElement.nativeElement;
        }
        /** @type {?} */
        var items = Array.prototype.slice.call(listElement.childNodes).filter((/**
         * @param {?} node
         * @return {?}
         */
        function (node) {
            if (node.nodeType === 1) {
                // if node is element
                return node.className.includes('item');
            }
            else {
                return false;
            }
        }));
        if (!items.length) {
            return;
        }
        /** @type {?} */
        var listHeight = listElement.offsetHeight;
        /** @type {?} */
        var itemHeight = items[index].offsetHeight;
        /** @type {?} */
        var visibleTop = listElement.scrollTop;
        /** @type {?} */
        var visibleBottom = listElement.scrollTop + listHeight - itemHeight;
        /** @type {?} */
        var targetPosition = items[index].offsetTop;
        if (targetPosition < visibleTop) {
            listElement.scrollTop = targetPosition;
        }
        if (targetPosition > visibleBottom) {
            listElement.scrollTop = targetPosition - listHeight + itemHeight;
        }
    };
    /**
     * Select item on enter click
     */
    /**
     * Select item on enter click
     * @return {?}
     */
    AutocompleteComponent.prototype.onHandleEnter = /**
     * Select item on enter click
     * @return {?}
     */
    function () {
        // click enter to choose item from filteredList or historyList
        if (this.selectedIdx > -1) {
            if (!this.historyList.length || !this.isHistoryListVisible) {
                // filteredList
                this.query = !this.isType(this.filteredList[this.selectedIdx])
                    ? this.filteredList[this.selectedIdx][this.searchKeyword]
                    : this.filteredList[this.selectedIdx];
                this.saveHistory(this.filteredList[this.selectedIdx]);
                this.select(this.filteredList[this.selectedIdx]);
            }
            else {
                // historyList
                this.query = !this.isType(this.historyList[this.selectedIdx])
                    ? this.historyList[this.selectedIdx][this.searchKeyword]
                    : this.historyList[this.selectedIdx];
                this.saveHistory(this.historyList[this.selectedIdx]);
                this.select(this.historyList[this.selectedIdx]);
            }
        }
        this.isHistoryListVisible = false;
        this.handleClose();
    };
    /**
     * Esc click
     */
    /**
     * Esc click
     * @return {?}
     */
    AutocompleteComponent.prototype.onEsc = /**
     * Esc click
     * @return {?}
     */
    function () {
        this.searchInput.nativeElement.blur();
        this.handleClose();
    };
    /**
     * Tab click
     */
    /**
     * Tab click
     * @return {?}
     */
    AutocompleteComponent.prototype.onTab = /**
     * Tab click
     * @return {?}
     */
    function () {
        this.searchInput.nativeElement.blur();
        this.handleClose();
    };
    /**
     * Delete click
     */
    /**
     * Delete click
     * @return {?}
     */
    AutocompleteComponent.prototype.onDelete = /**
     * Delete click
     * @return {?}
     */
    function () {
        // panel is open on delete
        this.isOpen = true;
    };
    /**
     * Select item to save in localStorage
     * @param selected
     */
    /**
     * Select item to save in localStorage
     * @param {?} selected
     * @return {?}
     */
    AutocompleteComponent.prototype.saveHistory = /**
     * Select item to save in localStorage
     * @param {?} selected
     * @return {?}
     */
    function (selected) {
        var _this = this;
        if (this.historyIdentifier) {
            // check if selected item exists in historyList
            if (!this.historyList.some((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return !_this.isType(item)
                ? item[_this.searchKeyword] == selected[_this.searchKeyword] : item == selected; }))) {
                this.saveHistoryToLocalStorage(__spread([selected], this.historyList));
                // check if items don't exceed max allowed number
                if (this.historyList.length >= this.historyListMaxNumber) {
                    this.historyList.splice(this.historyList.length - 1, 1);
                    this.saveHistoryToLocalStorage(__spread([selected], this.historyList));
                }
            }
            else {
                // if selected item exists in historyList swap to top in array
                if (!this.isType(selected)) {
                    // object logic
                    /** @type {?} */
                    var copiedHistoryList = this.historyList.slice();
                    // copy original historyList array
                    /** @type {?} */
                    var selectedIndex = copiedHistoryList.map((/**
                     * @param {?} item
                     * @return {?}
                     */
                    function (item) { return item[_this.searchKeyword]; })).indexOf(selected[this.searchKeyword]);
                    copiedHistoryList.splice(selectedIndex, 1);
                    copiedHistoryList.splice(0, 0, selected);
                    this.saveHistoryToLocalStorage(__spread(copiedHistoryList));
                }
                else {
                    // string logic
                    /** @type {?} */
                    var copiedHistoryList = this.historyList.slice();
                    copiedHistoryList.splice(this.historyList.indexOf(selected), 1);
                    copiedHistoryList.splice(0, 0, selected);
                    this.saveHistoryToLocalStorage(__spread(copiedHistoryList));
                }
            }
        }
    };
    /**
     * Save item in localStorage
     * @param selected
     */
    /**
     * Save item in localStorage
     * @param {?} selected
     * @return {?}
     */
    AutocompleteComponent.prototype.saveHistoryToLocalStorage = /**
     * Save item in localStorage
     * @param {?} selected
     * @return {?}
     */
    function (selected) {
        window.localStorage.setItem("" + this.historyIdentifier, JSON.stringify(selected));
    };
    /**
     * Remove item from localStorage
     * @param index
     * @param e event
     */
    /**
     * Remove item from localStorage
     * @param {?} index
     * @param {?} e event
     * @return {?}
     */
    AutocompleteComponent.prototype.removeHistoryItem = /**
     * Remove item from localStorage
     * @param {?} index
     * @param {?} e event
     * @return {?}
     */
    function (index, e) {
        e.stopPropagation();
        this.historyList = this.historyList.filter((/**
         * @param {?} v
         * @param {?} i
         * @return {?}
         */
        function (v, i) { return i !== index; }));
        this.saveHistoryToLocalStorage(this.historyList);
        if (this.historyList.length == 0) {
            window.localStorage.removeItem("" + this.historyIdentifier);
            this.filterList();
        }
    };
    /**
     * Reset localStorage
     * @param e event
     */
    /**
     * Reset localStorage
     * @param {?} e event
     * @return {?}
     */
    AutocompleteComponent.prototype.resetHistoryList = /**
     * Reset localStorage
     * @param {?} e event
     * @return {?}
     */
    function (e) {
        e.stopPropagation();
        this.historyList = [];
        window.localStorage.removeItem("" + this.historyIdentifier);
        this.filterList();
    };
    AutocompleteComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ng-autocomplete',
                    template: "<div class=\"autocomplete-container\"\n     [ngClass]=\"{ 'active': isOpen}\">\n  <div class=\"input-container\">\n    <input #searchInput type=\"text\" placeholder={{placeHolder}}\n           [(ngModel)]=query\n           (input)=\"onChange($event)\"\n           (focus)=handleFocus($event)\n           [disabled]=\"disabled\">\n    <div class=\"x\" *ngIf=\"query && !isLoading && !disabled\" (click)=\"remove($event)\">\n      <i class=\"material-icons\">close</i>\n    </div>\n    <!--Loading mask-->\n    <div class=\"sk-fading-circle\" *ngIf=\"isLoading\">\n      <div class=\"sk-circle1 sk-circle\"></div>\n      <div class=\"sk-circle2 sk-circle\"></div>\n      <div class=\"sk-circle3 sk-circle\"></div>\n      <div class=\"sk-circle4 sk-circle\"></div>\n      <div class=\"sk-circle5 sk-circle\"></div>\n      <div class=\"sk-circle6 sk-circle\"></div>\n      <div class=\"sk-circle7 sk-circle\"></div>\n      <div class=\"sk-circle8 sk-circle\"></div>\n      <div class=\"sk-circle9 sk-circle\"></div>\n      <div class=\"sk-circle10 sk-circle\"></div>\n      <div class=\"sk-circle11 sk-circle\"></div>\n      <div class=\"sk-circle12 sk-circle\"></div>\n    </div>\n  </div>\n\n  <!--FilteredList items-->\n  <div class=\"suggestions-container\"\n       [ngClass]=\"{ 'is-hidden': isHistoryListVisible, 'is-visible': !isHistoryListVisible}\">\n    <!--FilteredList heading-->\n    <div class=\"heading\" *ngIf=\"filteredList.length > 0 && heading\">\n      <div class=\"text\">{{heading}}</div>\n    </div>\n\n    <ul #filteredListElement>\n      <li *ngFor=\"let item of filteredList; let idx = index\" class=\"item\">\n        <!--string logic-->\n        <div [class.complete-selected]=\"idx === selectedIdx\" *ngIf='isType(item)'\n             (click)=\"select(item)\">\n          <ng-container\n            *ngTemplateOutlet=\"itemTemplate;  context: { $implicit: item | highlight: toHighlight }\">\n          </ng-container>\n        </div>\n        <!--object logic-->\n        <div [class.complete-selected]=\"idx === selectedIdx\" *ngIf='!isType(item)'\n             (click)=\"select(item)\">\n          <ng-container\n            *ngTemplateOutlet=\"itemTemplate; context: { $implicit: item | highlight: toHighlight : searchKeyword }\">\n          </ng-container>\n        </div>\n      </li>\n    </ul>\n  </div>\n\n  <!--HistoryList items-->\n  <div class=\"suggestions-container\"\n       [ngClass]=\"{ 'is-hidden': !isHistoryListVisible, 'is-visible': isHistoryListVisible}\">\n    <!--HistoryList heading-->\n    <div class=\"heading\" *ngIf=\"historyList.length > 0 && historyHeading\">\n      <div class=\"text\">{{historyHeading}}</div>\n      <div class=\"x\" (click)=\"resetHistoryList($event)\">\n        <i class=\"material-icons\">delete</i>\n      </div>\n    </div>\n\n    <ul #historyListElement>\n      <li *ngFor=\"let item of historyList; let idx = index\" class=\"item\">\n        <!--string logic-->\n        <div [class.complete-selected]=\"idx === selectedIdx\" *ngIf='isType(item)' (click)=\"select(item)\">\n          <ng-container\n            *ngTemplateOutlet=\"itemTemplate;  context: { $implicit: item }\">\n          </ng-container>\n        </div>\n        <!--object logic-->\n        <div [class.complete-selected]=\"idx === selectedIdx\" *ngIf='!isType(item)' (click)=\"select(item)\">\n          <ng-container\n            *ngTemplateOutlet=\"itemTemplate; context: { $implicit: item }\">\n          </ng-container>\n        </div>\n        <div class=\"x\" (click)=\"removeHistoryItem(idx, $event)\">\n          <i class=\"material-icons\">close</i>\n        </div>\n      </li>\n    </ul>\n  </div>\n\n  <!--Not found-->\n  <div class=\"not-found\" *ngIf=\"isLoading ? !isLoading && notFound : notFound\">\n    <ng-container\n      *ngTemplateOutlet=\"notFoundTemplate;  context: { $implicit: notFoundText  }\">\n    </ng-container>\n  </div>\n</div>\n<div class=\"overlay\" *ngIf=\"overlay\" (click)=\"handleOverlay()\"></div>\n",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return AutocompleteComponent; })),
                            multi: true
                        }
                    ],
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        '(document:click)': 'handleClick($event)',
                        'class': 'ng-autocomplete'
                    },
                    styles: ["@import url(https://fonts.googleapis.com/icon?family=Material+Icons);.ng-autocomplete{width:600px}.autocomplete-container{box-shadow:0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12);position:relative;overflow:visible;height:40px}.autocomplete-container .input-container input{font-size:14px;box-sizing:border-box;border:none;box-shadow:none;outline:0;background-color:#fff;color:rgba(0,0,0,.87);width:100%;padding:0 15px;line-height:40px;height:40px}.autocomplete-container .input-container input:disabled{background-color:#eee;color:#666}.autocomplete-container .input-container .x{position:absolute;right:10px;margin:auto;cursor:pointer;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.autocomplete-container .input-container .x i{color:rgba(0,0,0,.54);font-size:22px;vertical-align:middle}.autocomplete-container .suggestions-container{position:absolute;width:100%;background:#fff;height:auto;box-shadow:0 2px 5px rgba(0,0,0,.25);box-sizing:border-box}.autocomplete-container .suggestions-container ul{padding:0;margin:0;max-height:240px;overflow-y:auto}.autocomplete-container .suggestions-container ul li{position:relative;list-style:none;padding:0;margin:0;cursor:pointer}.autocomplete-container .suggestions-container ul li a{padding:14px 15px;display:block;text-decoration:none;cursor:pointer;color:rgba(0,0,0,.87);font-size:15px}.autocomplete-container .suggestions-container .complete-selected,.autocomplete-container .suggestions-container ul li:hover{background-color:rgba(158,158,158,.18)}.autocomplete-container .suggestions-container .heading{position:relative;padding:10px 15px;border:1px solid #f1f1f1}.autocomplete-container .suggestions-container .heading .text{font-size:.85em}.autocomplete-container .suggestions-container .x{position:absolute;right:10px;margin:auto;cursor:pointer;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.autocomplete-container .suggestions-container .x i{color:rgba(0,0,0,.54);font-size:18px;vertical-align:middle}.autocomplete-container .suggestions-container.is-hidden{visibility:hidden}.autocomplete-container .suggestions-container.is-visible{visibility:visible}.autocomplete-container .not-found{padding:0 .75em;border:1px solid #f1f1f1;background:#fff}.autocomplete-container .not-found div{padding:.4em 0;font-size:.95em;line-height:1.4;border-bottom:1px solid rgba(230,230,230,.7)}.autocomplete-container.active{z-index:999}.highlight{font-weight:700}.overlay{position:absolute;background-color:transparent;width:100%;height:100%;top:0;right:0;bottom:0;left:0;z-index:50}input[type=text]::-ms-clear{display:none}.sk-fading-circle{width:20px;height:20px;position:absolute;right:10px;top:0;bottom:0;margin:auto}.sk-fading-circle .sk-circle{width:100%;height:100%;position:absolute;left:0;top:0}.sk-fading-circle .sk-circle:before{content:\"\";display:block;margin:0 auto;width:15%;height:15%;background-color:#333;border-radius:100%;-webkit-animation:1.2s ease-in-out infinite both sk-circleFadeDelay;animation:1.2s ease-in-out infinite both sk-circleFadeDelay}.sk-fading-circle .sk-circle2{-webkit-transform:rotate(30deg);transform:rotate(30deg)}.sk-fading-circle .sk-circle3{-webkit-transform:rotate(60deg);transform:rotate(60deg)}.sk-fading-circle .sk-circle4{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.sk-fading-circle .sk-circle5{-webkit-transform:rotate(120deg);transform:rotate(120deg)}.sk-fading-circle .sk-circle6{-webkit-transform:rotate(150deg);transform:rotate(150deg)}.sk-fading-circle .sk-circle7{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.sk-fading-circle .sk-circle8{-webkit-transform:rotate(210deg);transform:rotate(210deg)}.sk-fading-circle .sk-circle9{-webkit-transform:rotate(240deg);transform:rotate(240deg)}.sk-fading-circle .sk-circle10{-webkit-transform:rotate(270deg);transform:rotate(270deg)}.sk-fading-circle .sk-circle11{-webkit-transform:rotate(300deg);transform:rotate(300deg)}.sk-fading-circle .sk-circle12{-webkit-transform:rotate(330deg);transform:rotate(330deg)}.sk-fading-circle .sk-circle2:before{-webkit-animation-delay:-1.1s;animation-delay:-1.1s}.sk-fading-circle .sk-circle3:before{-webkit-animation-delay:-1s;animation-delay:-1s}.sk-fading-circle .sk-circle4:before{-webkit-animation-delay:-.9s;animation-delay:-.9s}.sk-fading-circle .sk-circle5:before{-webkit-animation-delay:-.8s;animation-delay:-.8s}.sk-fading-circle .sk-circle6:before{-webkit-animation-delay:-.7s;animation-delay:-.7s}.sk-fading-circle .sk-circle7:before{-webkit-animation-delay:-.6s;animation-delay:-.6s}.sk-fading-circle .sk-circle8:before{-webkit-animation-delay:-.5s;animation-delay:-.5s}.sk-fading-circle .sk-circle9:before{-webkit-animation-delay:-.4s;animation-delay:-.4s}.sk-fading-circle .sk-circle10:before{-webkit-animation-delay:-.3s;animation-delay:-.3s}.sk-fading-circle .sk-circle11:before{-webkit-animation-delay:-.2s;animation-delay:-.2s}.sk-fading-circle .sk-circle12:before{-webkit-animation-delay:-.1s;animation-delay:-.1s}@-webkit-keyframes sk-circleFadeDelay{0%,100%,39%{opacity:0}40%{opacity:1}}@keyframes sk-circleFadeDelay{0%,100%,39%{opacity:0}40%{opacity:1}}"]
                }] }
    ];
    /** @nocollapse */
    AutocompleteComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    AutocompleteComponent.propDecorators = {
        searchInput: [{ type: ViewChild, args: ['searchInput',] }],
        filteredListElement: [{ type: ViewChild, args: ['filteredListElement',] }],
        historyListElement: [{ type: ViewChild, args: ['historyListElement',] }],
        data: [{ type: Input }],
        searchKeyword: [{ type: Input }],
        placeHolder: [{ type: Input }],
        heading: [{ type: Input }],
        initialValue: [{ type: Input }],
        historyIdentifier: [{ type: Input }],
        historyHeading: [{ type: Input }],
        historyListMaxNumber: [{ type: Input }],
        notFoundText: [{ type: Input }],
        isLoading: [{ type: Input }],
        debounceTime: [{ type: Input }],
        disabled: [{ type: Input }],
        minQueryLength: [{ type: Input }],
        selected: [{ type: Output }],
        inputChanged: [{ type: Output }],
        inputFocused: [{ type: Output }],
        inputCleared: [{ type: Output }],
        opened: [{ type: Output }],
        closed: [{ type: Output }],
        scrolledToEnd: [{ type: Output }],
        itemTemplate: [{ type: Input }],
        notFoundTemplate: [{ type: Input }],
        customTemplate: [{ type: ContentChild, args: [TemplateRef,] }]
    };
    return AutocompleteComponent;
}());
export { AutocompleteComponent };
if (false) {
    /** @type {?} */
    AutocompleteComponent.prototype.searchInput;
    /** @type {?} */
    AutocompleteComponent.prototype.filteredListElement;
    /** @type {?} */
    AutocompleteComponent.prototype.historyListElement;
    /** @type {?} */
    AutocompleteComponent.prototype.inputKeyUp$;
    /** @type {?} */
    AutocompleteComponent.prototype.inputKeyDown$;
    /** @type {?} */
    AutocompleteComponent.prototype.query;
    /** @type {?} */
    AutocompleteComponent.prototype.filteredList;
    /** @type {?} */
    AutocompleteComponent.prototype.historyList;
    /** @type {?} */
    AutocompleteComponent.prototype.isHistoryListVisible;
    /** @type {?} */
    AutocompleteComponent.prototype.elementRef;
    /** @type {?} */
    AutocompleteComponent.prototype.selectedIdx;
    /** @type {?} */
    AutocompleteComponent.prototype.toHighlight;
    /** @type {?} */
    AutocompleteComponent.prototype.notFound;
    /** @type {?} */
    AutocompleteComponent.prototype.isFocused;
    /** @type {?} */
    AutocompleteComponent.prototype.isOpen;
    /** @type {?} */
    AutocompleteComponent.prototype.isScrollToEnd;
    /** @type {?} */
    AutocompleteComponent.prototype.overlay;
    /**
     * @type {?}
     * @private
     */
    AutocompleteComponent.prototype.manualOpen;
    /**
     * @type {?}
     * @private
     */
    AutocompleteComponent.prototype.manualClose;
    /**
     * Data of items list.
     * It can be array of strings or array of objects.
     * @type {?}
     */
    AutocompleteComponent.prototype.data;
    /** @type {?} */
    AutocompleteComponent.prototype.searchKeyword;
    /** @type {?} */
    AutocompleteComponent.prototype.placeHolder;
    /** @type {?} */
    AutocompleteComponent.prototype.heading;
    /** @type {?} */
    AutocompleteComponent.prototype.initialValue;
    /**
     * History identifier of history list
     * When valid history identifier is given, then component stores selected item to local storage of user's browser.
     * If it is null then history is hidden.
     * History list is visible if at least one history item is stored.
     * @type {?}
     */
    AutocompleteComponent.prototype.historyIdentifier;
    /**
     * Heading text of history list.
     * If it is null then history heading is hidden.
     * @type {?}
     */
    AutocompleteComponent.prototype.historyHeading;
    /** @type {?} */
    AutocompleteComponent.prototype.historyListMaxNumber;
    /** @type {?} */
    AutocompleteComponent.prototype.notFoundText;
    /** @type {?} */
    AutocompleteComponent.prototype.isLoading;
    /** @type {?} */
    AutocompleteComponent.prototype.debounceTime;
    /** @type {?} */
    AutocompleteComponent.prototype.disabled;
    /**
     * The minimum number of characters the user must type before a search is performed.
     * @type {?}
     */
    AutocompleteComponent.prototype.minQueryLength;
    /**
     * Event that is emitted whenever an item from the list is selected.
     * @type {?}
     */
    AutocompleteComponent.prototype.selected;
    /**
     * Event that is emitted whenever an input is changed.
     * @type {?}
     */
    AutocompleteComponent.prototype.inputChanged;
    /**
     * Event that is emitted whenever an input is focused.
     * @type {?}
     */
    AutocompleteComponent.prototype.inputFocused;
    /**
     * Event that is emitted whenever an input is cleared.
     * @type {?}
     */
    AutocompleteComponent.prototype.inputCleared;
    /**
     * Event that is emitted when the autocomplete panel is opened.
     * @type {?}
     */
    AutocompleteComponent.prototype.opened;
    /**
     * Event that is emitted when the autocomplete panel is closed.
     * @type {?}
     */
    AutocompleteComponent.prototype.closed;
    /**
     * Event that is emitted when scrolled to the end of items.
     * @type {?}
     */
    AutocompleteComponent.prototype.scrolledToEnd;
    /** @type {?} */
    AutocompleteComponent.prototype.itemTemplate;
    /** @type {?} */
    AutocompleteComponent.prototype.notFoundTemplate;
    /** @type {?} */
    AutocompleteComponent.prototype.customTemplate;
    /**
     * Propagates new value when model changes
     * @type {?}
     */
    AutocompleteComponent.prototype.propagateChange;
    /**
     * @type {?}
     * @private
     */
    AutocompleteComponent.prototype.renderer;
}
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbmctYXV0b2NvbXBsZXRlLyIsInNvdXJjZXMiOlsibGliL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFFTCxTQUFTLEVBQUUsWUFBWSxFQUN2QixVQUFVLEVBQ1YsWUFBWSxFQUFFLFVBQVUsRUFDeEIsS0FBSyxFQUVMLE1BQU0sRUFDTixTQUFTLEVBQ00sV0FBVyxFQUMxQixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxTQUFTLEVBQWEsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDekQsT0FBTyxFQUF1QixpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDOzs7OztJQUtqRSxTQUFTOzs7O0FBQUcsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLEtBQUssRUFBRSxFQUFkLENBQWMsQ0FBQTs7O0lBQ3JDLFdBQVc7Ozs7QUFBRyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sS0FBSyxFQUFFLEVBQWQsQ0FBYyxDQUFBOzs7SUFDdkMsYUFBYTs7OztBQUFHLFVBQUEsT0FBTyxJQUFJLE9BQUEsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBMUMsQ0FBMEMsQ0FBQTs7O0lBQ3JFLE9BQU87Ozs7QUFBRyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sS0FBSyxFQUFFLEVBQWQsQ0FBYyxDQUFBOzs7SUFDbkMsV0FBVzs7OztBQUFHLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxLQUFLLENBQUMsRUFBYixDQUFhLENBQUE7OztJQUN0QyxRQUFROzs7O0FBQUcsVUFBQSxPQUFPLElBQUks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bEQsb0RBQWtFOztJQUNsRSxtREFBZ0U7O0lBRWhFLDRDQUE2Qjs7SUFDN0IsOENBQStCOztJQUUvQixzQ0FBa0I7O0lBQ2xCLDZDQUF5Qjs7SUFDekIsNENBQXdCOztJQUN4QixxREFBbUM7O0lBQ25DLDJDQUFrQjs7SUFDbEIsNENBQXdCOztJQUN4Qiw0Q0FBZ0M7O0lBQ2hDLHlDQUF3Qjs7SUFDeEIsMENBQXlCOztJQUN6Qix1Q0FBc0I7O0lBQ3RCLDhDQUE2Qjs7SUFDN0Isd0NBQXVCOzs7OztJQUN2QiwyQ0FBK0I7Ozs7O0lBQy9CLDRDQUFnQzs7Ozs7O0lBUWhDLHFDQUEwQjs7SUFDMUIsOENBQXNDOztJQUN0Qyw0Q0FBaUM7O0lBQ2pDLHdDQUE2Qjs7SUFDN0IsNkNBQWtDOzs7Ozs7OztJQU9sQyxrREFBMEM7Ozs7OztJQUsxQywrQ0FBcUQ7O0lBQ3JELHFEQUEwQzs7SUFDMUMsNkNBQTJDOztJQUMzQywwQ0FBbUM7O0lBQ25DLDZDQUFrQzs7SUFDbEMseUNBQWtDOzs7OztJQUlsQywrQ0FBbUM7Ozs7O0lBS25DLHlDQUE2Qzs7Ozs7SUFHN0MsNkNBQWlEOzs7OztJQUdqRCw2Q0FBK0U7Ozs7O0lBRy9FLDZDQUErRTs7Ozs7SUFHL0UsdUNBQXlFOzs7OztJQUd6RSx1Q0FBeUU7Ozs7O0lBR3pFLDhDQUFnRjs7SUFJaEYsNkNBQTBDOztJQUMxQyxpREFBOEM7O0lBQzlDLCtDQUE4RDs7Ozs7SUFLOUQsZ0RBQ0U7Ozs7O0lBK0JrQyx5Q0FBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnQsIENvbnRlbnRDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLFxuICBJbnB1dCwgT25DaGFuZ2VzLFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2VzLCBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7ZnJvbUV2ZW50LCBPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZGVib3VuY2VUaW1lLCBmaWx0ZXIsIG1hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuLyoqXG4gKiBLZXlib2FyZCBldmVudHNcbiAqL1xuY29uc3QgaXNBcnJvd1VwID0ga2V5Q29kZSA9PiBrZXlDb2RlID09PSAzODtcbmNvbnN0IGlzQXJyb3dEb3duID0ga2V5Q29kZSA9PiBrZXlDb2RlID09PSA0MDtcbmNvbnN0IGlzQXJyb3dVcERvd24gPSBrZXlDb2RlID0+IGlzQXJyb3dVcChrZXlDb2RlKSB8fCBpc0Fycm93RG93bihrZXlDb2RlKTtcbmNvbnN0IGlzRW50ZXIgPSBrZXlDb2RlID0+IGtleUNvZGUgPT09IDEzO1xuY29uc3QgaXNCYWNrc3BhY2UgPSBrZXlDb2RlID0+IGtleUNvZGUgPT09IDg7XG5jb25zdCBpc0RlbGV0ZSA9IGtleUNvZGUgPT4ga2V5Q29kZSA9PT0gNDY7XG5jb25zdCBpc0VTQyA9IGtleUNvZGUgPT4ga2V5Q29kZSA9PT0gMjc7XG5jb25zdCBpc1RhYiA9IGtleUNvZGUgPT4ga2V5Q29kZSA9PT0gOTtcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZy1hdXRvY29tcGxldGUnLFxuICB0ZW1wbGF0ZVVybDogJy4vYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5zY3NzJ10sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQXV0b2NvbXBsZXRlQ29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfVxuICBdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBob3N0OiB7XG4gICAgJyhkb2N1bWVudDpjbGljayknOiAnaGFuZGxlQ2xpY2soJGV2ZW50KScsXG4gICAgJ2NsYXNzJzogJ25nLWF1dG9jb21wbGV0ZSdcbiAgfSxcbn0pXG5cbmV4cG9ydCBjbGFzcyBBdXRvY29tcGxldGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBAVmlld0NoaWxkKCdzZWFyY2hJbnB1dCcpIHNlYXJjaElucHV0OiBFbGVtZW50UmVmOyAvLyBpbnB1dCBlbGVtZW50XG4gIEBWaWV3Q2hpbGQoJ2ZpbHRlcmVkTGlzdEVsZW1lbnQnKSBmaWx0ZXJlZExpc3RFbGVtZW50OiBFbGVtZW50UmVmOyAvLyBlbGVtZW50IG9mIGl0ZW1zXG4gIEBWaWV3Q2hpbGQoJ2hpc3RvcnlMaXN0RWxlbWVudCcpIGhpc3RvcnlMaXN0RWxlbWVudDogRWxlbWVudFJlZjsgLy8gZWxlbWVudCBvZiBoaXN0b3J5IGl0ZW1zXG5cbiAgaW5wdXRLZXlVcCQ6IE9ic2VydmFibGU8YW55PjsgLy8gaW5wdXQgZXZlbnRzXG4gIGlucHV0S2V5RG93biQ6IE9ic2VydmFibGU8YW55PjsgLy8gaW5wdXQgZXZlbnRzXG5cbiAgcHVibGljIHF1ZXJ5ID0gJyc7IC8vIHNlYXJjaCBxdWVyeVxuICBwdWJsaWMgZmlsdGVyZWRMaXN0ID0gW107IC8vIGxpc3Qgb2YgaXRlbXNcbiAgcHVibGljIGhpc3RvcnlMaXN0ID0gW107IC8vIGxpc3Qgb2YgaGlzdG9yeSBpdGVtc1xuICBwdWJsaWMgaXNIaXN0b3J5TGlzdFZpc2libGUgPSB0cnVlO1xuICBwdWJsaWMgZWxlbWVudFJlZjtcbiAgcHVibGljIHNlbGVjdGVkSWR4ID0gLTE7XG4gIHB1YmxpYyB0b0hpZ2hsaWdodDogc3RyaW5nID0gJyc7XG4gIHB1YmxpYyBub3RGb3VuZCA9IGZhbHNlO1xuICBwdWJsaWMgaXNGb2N1c2VkID0gZmFsc2U7XG4gIHB1YmxpYyBpc09wZW4gPSBmYWxzZTtcbiAgcHVibGljIGlzU2Nyb2xsVG9FbmQgPSBmYWxzZTtcbiAgcHVibGljIG92ZXJsYXkgPSBmYWxzZTtcbiAgcHJpdmF0ZSBtYW51YWxPcGVuID0gdW5kZWZpbmVkO1xuICBwcml2YXRlIG1hbnVhbENsb3NlID0gdW5kZWZpbmVkO1xuXG5cbiAgLy8gQElucHV0c1xuICAvKipcbiAgICogRGF0YSBvZiBpdGVtcyBsaXN0LlxuICAgKiBJdCBjYW4gYmUgYXJyYXkgb2Ygc3RyaW5ncyBvciBhcnJheSBvZiBvYmplY3RzLlxuICAgKi9cbiAgQElucHV0KCkgcHVibGljIGRhdGEgPSBbXTtcbiAgQElucHV0KCkgcHVibGljIHNlYXJjaEtleXdvcmQ6IHN0cmluZzsgLy8ga2V5d29yZCB0byBmaWx0ZXIgdGhlIGxpc3RcbiAgQElucHV0KCkgcHVibGljIHBsYWNlSG9sZGVyID0gJyc7IC8vIGlucHV0IHBsYWNlaG9sZGVyXG4gIEBJbnB1dCgpIHB1YmxpYyBoZWFkaW5nID0gJyc7XG4gIEBJbnB1dCgpIHB1YmxpYyBpbml0aWFsVmFsdWU6IGFueTsgLy8gc2V0IGluaXRpYWwgdmFsdWVcbiAgLyoqXG4gICAqIEhpc3RvcnkgaWRlbnRpZmllciBvZiBoaXN0b3J5IGxpc3RcbiAgICogV2hlbiB2YWxpZCBoaXN0b3J5IGlkZW50aWZpZXIgaXMgZ2l2ZW4sIHRoZW4gY29tcG9uZW50IHN0b3JlcyBzZWxlY3RlZCBpdGVtIHRvIGxvY2FsIHN0b3JhZ2Ugb2YgdXNlcidzIGJyb3dzZXIuXG4gICAqIElmIGl0IGlzIG51bGwgdGhlbiBoaXN0b3J5IGlzIGhpZGRlbi5cbiAgICogSGlzdG9yeSBsaXN0IGlzIHZpc2libGUgaWYgYXQgbGVhc3Qgb25lIGhpc3RvcnkgaXRlbSBpcyBzdG9yZWQuXG4gICAqL1xuICBASW5wdXQoKSBwdWJsaWMgaGlzdG9yeUlkZW50aWZpZXI6IHN0cmluZztcbiAgLyoqXG4gICAqIEhlYWRpbmcgdGV4dCBvZiBoaXN0b3J5IGxpc3QuXG4gICAqIElmIGl0IGlzIG51bGwgdGhlbiBoaXN0b3J5IGhlYWRpbmcgaXMgaGlkZGVuLlxuICAgKi9cbiAgQElucHV0KCkgcHVibGljIGhpc3RvcnlIZWFkaW5nID0gJ1JlY2VudGx5IHNlbGVjdGVkJztcbiAgQElucHV0KCkgcHVibGljIGhpc3RvcnlMaXN0TWF4TnVtYmVyID0gMTU7IC8vIG1heGltdW0gbnVtYmVyIG9mIGl0ZW1zIGluIHRoZSBoaXN0b3J5IGxpc3QuXG4gIEBJbnB1dCgpIHB1YmxpYyBub3RGb3VuZFRleHQgPSAnTm90IGZvdW5kJzsgLy8gc2V0IGN1c3RvbSB0ZXh0IHdoZW4gZmlsdGVyIHJldHVybnMgZW1wdHkgcmVzdWx0XG4gIEBJbnB1dCgpIHB1YmxpYyBpc0xvYWRpbmc6IGJvb2xlYW47IC8vIGxvYWRpbmcgbWFza1xuICBASW5wdXQoKSBwdWJsaWMgZGVib3VuY2VUaW1lOiA0MDA7IC8vIGRlbGF5IHRpbWUgd2hpbGUgdHlwaW5nXG4gIEBJbnB1dCgpIHB1YmxpYyBkaXNhYmxlZDogYm9vbGVhbjsgLy8gaW5wdXQgZGlzYWJsZS9lbmFibGVcbiAgLyoqXG4gICAqIFRoZSBtaW5pbXVtIG51bWJlciBvZiBjaGFyYWN0ZXJzIHRoZSB1c2VyIG11c3QgdHlwZSBiZWZvcmUgYSBzZWFyY2ggaXMgcGVyZm9ybWVkLlxuICAgKi9cbiAgQElucHV0KCkgcHVibGljIG1pblF1ZXJ5TGVuZ3RoID0gMTtcblxuXG4gIC8vIEBPdXRwdXQgZXZlbnRzXG4gIC8qKiBFdmVudCB0aGF0IGlzIGVtaXR0ZWQgd2hlbmV2ZXIgYW4gaXRlbSBmcm9tIHRoZSBsaXN0IGlzIHNlbGVjdGVkLiAqL1xuICBAT3V0cHV0KCkgc2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAvKiogRXZlbnQgdGhhdCBpcyBlbWl0dGVkIHdoZW5ldmVyIGFuIGlucHV0IGlzIGNoYW5nZWQuICovXG4gIEBPdXRwdXQoKSBpbnB1dENoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAvKiogRXZlbnQgdGhhdCBpcyBlbWl0dGVkIHdoZW5ldmVyIGFuIGlucHV0IGlzIGZvY3VzZWQuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBpbnB1dEZvY3VzZWQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAvKiogRXZlbnQgdGhhdCBpcyBlbWl0dGVkIHdoZW5ldmVyIGFuIGlucHV0IGlzIGNsZWFyZWQuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBpbnB1dENsZWFyZWQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAvKiogRXZlbnQgdGhhdCBpcyBlbWl0dGVkIHdoZW4gdGhlIGF1dG9jb21wbGV0ZSBwYW5lbCBpcyBvcGVuZWQuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBvcGVuZWQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAvKiogRXZlbnQgdGhhdCBpcyBlbWl0dGVkIHdoZW4gdGhlIGF1dG9jb21wbGV0ZSBwYW5lbCBpcyBjbG9zZWQuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBjbG9zZWQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAvKiogRXZlbnQgdGhhdCBpcyBlbWl0dGVkIHdoZW4gc2Nyb2xsZWQgdG8gdGhlIGVuZCBvZiBpdGVtcy4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IHNjcm9sbGVkVG9FbmQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuXG4gIC8vIEN1c3RvbSB0ZW1wbGF0ZXNcbiAgQElucHV0KCkgaXRlbVRlbXBsYXRlICE6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBJbnB1dCgpIG5vdEZvdW5kVGVtcGxhdGUgITogVGVtcGxhdGVSZWY8YW55PjtcbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZikgY3VzdG9tVGVtcGxhdGUgITogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogUHJvcGFnYXRlcyBuZXcgdmFsdWUgd2hlbiBtb2RlbCBjaGFuZ2VzXG4gICAqL1xuICBwcm9wYWdhdGVDaGFuZ2U6IGFueSA9ICgpID0+IHtcbiAgfTtcblxuXG4gIC8qKlxuICAgKiBXcml0ZXMgYSBuZXcgdmFsdWUgZnJvbSB0aGUgZm9ybSBtb2RlbCBpbnRvIHRoZSB2aWV3LFxuICAgKiBVcGRhdGVzIG1vZGVsXG4gICAqL1xuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLnF1ZXJ5ID0gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGEgaGFuZGxlciB0aGF0IGlzIGNhbGxlZCB3aGVuIHNvbWV0aGluZyBpbiB0aGUgdmlldyBoYXMgY2hhbmdlZFxuICAgKi9cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbikge1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGEgaGFuZGxlciBzcGVjaWZpY2FsbHkgZm9yIHdoZW4gYSBjb250cm9sIHJlY2VpdmVzIGEgdG91Y2ggZXZlbnRcbiAgICovXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gIH1cblxuICAvKipcbiAgICogRXZlbnQgdGhhdCBpcyBjYWxsZWQgd2hlbiB0aGUgdmFsdWUgb2YgYW4gaW5wdXQgZWxlbWVudCBpcyBjaGFuZ2VkXG4gICAqL1xuICBvbkNoYW5nZShldmVudCkge1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICB0aGlzLmVsZW1lbnRSZWYgPSBlbGVtZW50UmVmO1xuICB9XG5cbiAgLyoqXG4gICAqIEV2ZW50IHRoYXQgaXMgY2FsbGVkIHdoZW4gdGhlIGNvbnRyb2wgc3RhdHVzIGNoYW5nZXMgdG8gb3IgZnJvbSBESVNBQkxFRFxuICAgKi9cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnNldEluaXRpYWxWYWx1ZSh0aGlzLmluaXRpYWxWYWx1ZSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5pbml0RXZlbnRTdHJlYW0oKTtcbiAgICB0aGlzLmhhbmRsZVNjcm9sbCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBpbml0aWFsIHZhbHVlXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKi9cbiAgcHVibGljIHNldEluaXRpYWxWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHRoaXMuaW5pdGlhbFZhbHVlKSB7XG4gICAgICB0aGlzLnNlbGVjdCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBzZWFyY2ggcmVzdWx0c1xuICAgKi9cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChcbiAgICAgIGNoYW5nZXMgJiZcbiAgICAgIGNoYW5nZXMuZGF0YSAmJlxuICAgICAgQXJyYXkuaXNBcnJheShjaGFuZ2VzLmRhdGEuY3VycmVudFZhbHVlKVxuICAgICkge1xuICAgICAgdGhpcy5oYW5kbGVJdGVtc0NoYW5nZSgpO1xuICAgICAgaWYgKCFjaGFuZ2VzLmRhdGEuZmlyc3RDaGFuZ2UgJiYgdGhpcy5pc0ZvY3VzZWQpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVPcGVuKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEl0ZW1zIGNoYW5nZVxuICAgKi9cbiAgcHVibGljIGhhbmRsZUl0ZW1zQ2hhbmdlKCkge1xuICAgIHRoaXMuaXNTY3JvbGxUb0VuZCA9IGZhbHNlO1xuICAgIGlmICghdGhpcy5pc09wZW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmZpbHRlcmVkTGlzdCA9IHRoaXMuZGF0YTtcbiAgICB0aGlzLm5vdEZvdW5kID0gIXRoaXMuZmlsdGVyZWRMaXN0IHx8IHRoaXMuZmlsdGVyZWRMaXN0Lmxlbmd0aCA9PT0gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaWx0ZXIgZGF0YVxuICAgKi9cbiAgcHVibGljIGZpbHRlckxpc3QoKSB7XG4gICAgdGhpcy5zZWxlY3RlZElkeCA9IC0xO1xuICAgIHRoaXMuaW5pdFNlYXJjaEhpc3RvcnkoKTtcbiAgICBpZiAodGhpcy5xdWVyeSAhPSBudWxsICYmIHRoaXMuZGF0YSkge1xuICAgICAgdGhpcy50b0hpZ2hsaWdodCA9IHRoaXMucXVlcnk7XG4gICAgICB0aGlzLmZpbHRlcmVkTGlzdCA9IHRoaXMuZGF0YS5maWx0ZXIoKGl0ZW06IGFueSkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgLy8gc3RyaW5nIGxvZ2ljLCBjaGVjayBlcXVhbGl0eSBvZiBzdHJpbmdzXG4gICAgICAgICAgcmV0dXJuIGl0ZW0udG9Mb3dlckNhc2UoKS5pbmRleE9mKHRoaXMucXVlcnkudG9Mb3dlckNhc2UoKSkgPiAtMTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaXRlbSA9PT0gJ29iamVjdCcgJiYgaXRlbS5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0KSB7XG4gICAgICAgICAgLy8gb2JqZWN0IGxvZ2ljLCBjaGVjayBwcm9wZXJ0eSBlcXVhbGl0eVxuICAgICAgICAgIHJldHVybiBpdGVtW3RoaXMuc2VhcmNoS2V5d29yZF0udG9Mb3dlckNhc2UoKS5pbmRleE9mKHRoaXMucXVlcnkudG9Mb3dlckNhc2UoKSkgPiAtMTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubm90Rm91bmQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBDaGVjayB0eXBlIG9mIGl0ZW0gaW4gdGhlIGxpc3QuXG4gICAqIEBwYXJhbSBpdGVtXG4gICAqL1xuICBpc1R5cGUoaXRlbSkge1xuICAgIHJldHVybiB0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZyc7XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0IGl0ZW0gaW4gdGhlIGxpc3QuXG4gICAqIEBwYXJhbSBpdGVtXG4gICAqL1xuICBwdWJsaWMgc2VsZWN0KGl0ZW0pIHtcbiAgICB0aGlzLnF1ZXJ5ID0gIXRoaXMuaXNUeXBlKGl0ZW0pID8gaXRlbVt0aGlzLnNlYXJjaEtleXdvcmRdIDogaXRlbTtcbiAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG4gICAgdGhpcy5vdmVybGF5ID0gZmFsc2U7XG4gICAgdGhpcy5zZWxlY3RlZC5lbWl0KGl0ZW0pO1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKGl0ZW0pO1xuXG4gICAgaWYgKHRoaXMuaW5pdGlhbFZhbHVlKSB7XG4gICAgICAvLyBjaGVjayBpZiBoaXN0b3J5IGFscmVhZHkgZXhpc3RzIGluIGxvY2FsU3RvcmFnZSBhbmQgdGhlbiB1cGRhdGVcbiAgICAgIGNvbnN0IGhpc3RvcnkgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oYCR7dGhpcy5oaXN0b3J5SWRlbnRpZmllcn1gKTtcbiAgICAgIGlmIChoaXN0b3J5KSB7XG4gICAgICAgIGxldCBleGlzdGluZ0hpc3RvcnkgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZVtgJHt0aGlzLmhpc3RvcnlJZGVudGlmaWVyfWBdKTtcbiAgICAgICAgaWYgKCEoZXhpc3RpbmdIaXN0b3J5IGluc3RhbmNlb2YgQXJyYXkpKSBleGlzdGluZ0hpc3RvcnkgPSBbXTtcblxuICAgICAgICAvLyBjaGVjayBpZiBzZWxlY3RlZCBpdGVtIGV4aXN0cyBpbiBleGlzdGluZ0hpc3RvcnlcbiAgICAgICAgaWYgKCFleGlzdGluZ0hpc3Rvcnkuc29tZSgoZXhpc3RpbmdJdGVtKSA9PiAhdGhpcy5pc1R5cGUoZXhpc3RpbmdJdGVtKVxuICAgICAgICAgID8gZXhpc3RpbmdJdGVtW3RoaXMuc2VhcmNoS2V5d29yZF0gPT0gaXRlbVt0aGlzLnNlYXJjaEtleXdvcmRdIDogZXhpc3RpbmdJdGVtID09IGl0ZW0pKSB7XG4gICAgICAgICAgZXhpc3RpbmdIaXN0b3J5LnVuc2hpZnQoaXRlbSk7XG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYCR7dGhpcy5oaXN0b3J5SWRlbnRpZmllcn1gLCBKU09OLnN0cmluZ2lmeShleGlzdGluZ0hpc3RvcnkpKTtcblxuICAgICAgICAgIC8vIGNoZWNrIGlmIGl0ZW1zIGRvbid0IGV4Y2VlZCBtYXggYWxsb3dlZCBudW1iZXJcbiAgICAgICAgICBpZiAoZXhpc3RpbmdIaXN0b3J5Lmxlbmd0aCA+PSB0aGlzLmhpc3RvcnlMaXN0TWF4TnVtYmVyKSB7XG4gICAgICAgICAgICBleGlzdGluZ0hpc3Rvcnkuc3BsaWNlKGV4aXN0aW5nSGlzdG9yeS5sZW5ndGggLSAxLCAxKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGAke3RoaXMuaGlzdG9yeUlkZW50aWZpZXJ9YCwgSlNPTi5zdHJpbmdpZnkoZXhpc3RpbmdIaXN0b3J5KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGlmIHNlbGVjdGVkIGl0ZW0gZXhpc3RzIGluIGV4aXN0aW5nSGlzdG9yeSBzd2FwIHRvIHRvcCBpbiBhcnJheVxuICAgICAgICAgIGlmICghdGhpcy5pc1R5cGUoaXRlbSkpIHtcbiAgICAgICAgICAgIC8vIG9iamVjdCBsb2dpY1xuICAgICAgICAgICAgY29uc3QgY29waWVkRXhpc3RpbmdIaXN0b3J5ID0gZXhpc3RpbmdIaXN0b3J5LnNsaWNlKCk7IC8vIGNvcHkgb3JpZ2luYWwgZXhpc3RpbmdIaXN0b3J5IGFycmF5XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZEluZGV4ID0gY29waWVkRXhpc3RpbmdIaXN0b3J5Lm1hcCgoZWwpID0+IGVsW3RoaXMuc2VhcmNoS2V5d29yZF0pLmluZGV4T2YoaXRlbVt0aGlzLnNlYXJjaEtleXdvcmRdKTtcbiAgICAgICAgICAgIGNvcGllZEV4aXN0aW5nSGlzdG9yeS5zcGxpY2Uoc2VsZWN0ZWRJbmRleCwgMSk7XG4gICAgICAgICAgICBjb3BpZWRFeGlzdGluZ0hpc3Rvcnkuc3BsaWNlKDAsIDAsIGl0ZW0pO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYCR7dGhpcy5oaXN0b3J5SWRlbnRpZmllcn1gLCBKU09OLnN0cmluZ2lmeShjb3BpZWRFeGlzdGluZ0hpc3RvcnkpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gc3RyaW5nIGxvZ2ljXG4gICAgICAgICAgICBjb25zdCBjb3BpZWRFeGlzdGluZ0hpc3RvcnkgPSBleGlzdGluZ0hpc3Rvcnkuc2xpY2UoKTsgLy8gY29weSBvcmlnaW5hbCBleGlzdGluZ0hpc3RvcnkgYXJyYXlcbiAgICAgICAgICAgIGNvcGllZEV4aXN0aW5nSGlzdG9yeS5zcGxpY2UoY29waWVkRXhpc3RpbmdIaXN0b3J5LmluZGV4T2YoaXRlbSksIDEpO1xuICAgICAgICAgICAgY29waWVkRXhpc3RpbmdIaXN0b3J5LnNwbGljZSgwLCAwLCBpdGVtKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGAke3RoaXMuaGlzdG9yeUlkZW50aWZpZXJ9YCwgSlNPTi5zdHJpbmdpZnkoY29waWVkRXhpc3RpbmdIaXN0b3J5KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNhdmVIaXN0b3J5KGl0ZW0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNhdmVIaXN0b3J5KGl0ZW0pO1xuICAgIH1cbiAgICB0aGlzLmhhbmRsZUNsb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogRG9jdW1lbnQgY2xpY2tcbiAgICogQHBhcmFtIGUgZXZlbnRcbiAgICovXG4gIHB1YmxpYyBoYW5kbGVDbGljayhlKSB7XG4gICAgbGV0IGNsaWNrZWRDb21wb25lbnQgPSBlLnRhcmdldDtcbiAgICBsZXQgaW5zaWRlID0gZmFsc2U7XG4gICAgZG8ge1xuICAgICAgaWYgKGNsaWNrZWRDb21wb25lbnQgPT09IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgIGluc2lkZSA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLmZpbHRlcmVkTGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLmhhbmRsZU9wZW4oKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY2xpY2tlZENvbXBvbmVudCA9IGNsaWNrZWRDb21wb25lbnQucGFyZW50Tm9kZTtcbiAgICB9IHdoaWxlIChjbGlja2VkQ29tcG9uZW50KTtcbiAgICBpZiAoIWluc2lkZSkge1xuICAgICAgdGhpcy5oYW5kbGVDbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGUgYm9keSBvdmVybGF5XG4gICAqL1xuICBoYW5kbGVPdmVybGF5KCkge1xuICAgIHRoaXMub3ZlcmxheSA9IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNjcm9sbCBpdGVtc1xuICAgKi9cbiAgcHVibGljIGhhbmRsZVNjcm9sbCgpIHtcbiAgICB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmZpbHRlcmVkTGlzdEVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3Njcm9sbCcsICgpID0+IHtcbiAgICAgIHRoaXMuc2Nyb2xsVG9FbmQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmUgcGFuZWwgc3RhdGVcbiAgICovXG4gIHNldFBhbmVsU3RhdGUoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgICAvLyBJZiBjb250cm9scyBhcmUgdW50b3VjaGVkXG4gICAgaWYgKHR5cGVvZiB0aGlzLm1hbnVhbE9wZW4gPT09ICd1bmRlZmluZWQnXG4gICAgICAmJiB0eXBlb2YgdGhpcy5tYW51YWxDbG9zZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgICB0aGlzLmhhbmRsZU9wZW4oKTtcbiAgICB9XG5cbiAgICAvLyBJZiBvbmUgb2YgdGhlIGNvbnRyb2xzIGlzIHVudG91Y2hlZCBhbmQgb3RoZXIgaXMgZGVhY3RpdmF0ZWRcbiAgICBpZiAodHlwZW9mIHRoaXMubWFudWFsT3BlbiA9PT0gJ3VuZGVmaW5lZCdcbiAgICAgICYmIHRoaXMubWFudWFsQ2xvc2UgPT09IGZhbHNlXG4gICAgICB8fCB0eXBlb2YgdGhpcy5tYW51YWxDbG9zZSA9PT0gJ3VuZGVmaW5lZCdcbiAgICAgICYmIHRoaXMubWFudWFsT3BlbiA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgICB0aGlzLmhhbmRsZU9wZW4oKTtcbiAgICB9XG5cbiAgICAvLyBpZiBjb250cm9scyBhcmUgdG91Y2hlZCBidXQgYm90aCBhcmUgZGVhY3RpdmF0ZWRcbiAgICBpZiAodGhpcy5tYW51YWxPcGVuID09PSBmYWxzZSAmJiB0aGlzLm1hbnVhbENsb3NlID09PSBmYWxzZSkge1xuICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICAgIHRoaXMuaGFuZGxlT3BlbigpO1xuICAgIH1cblxuICAgIC8vIGlmIG9wZW4gY29udHJvbCBpcyB0b3VjaGVkIGFuZCBhY3RpdmF0ZWRcbiAgICBpZiAodGhpcy5tYW51YWxPcGVuKSB7XG4gICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgICAgdGhpcy5oYW5kbGVPcGVuKCk7XG4gICAgICB0aGlzLm1hbnVhbE9wZW4gPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBpZiBjbG9zZSBjb250cm9sIGlzIHRvdWNoZWQgYW5kIGFjdGl2YXRlZFxuICAgIGlmICh0aGlzLm1hbnVhbENsb3NlKSB7XG4gICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG4gICAgICB0aGlzLmhhbmRsZUNsb3NlKCk7XG4gICAgICB0aGlzLm1hbnVhbENsb3NlID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1hbnVhbCBjb250cm9sc1xuICAgKi9cbiAgb3BlbigpIHtcbiAgICB0aGlzLm1hbnVhbE9wZW4gPSB0cnVlO1xuICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgdGhpcy5oYW5kbGVPcGVuKCk7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLm1hbnVhbENsb3NlID0gdHJ1ZTtcbiAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG4gICAgdGhpcy5oYW5kbGVDbG9zZSgpO1xuICB9XG5cbiAgZm9jdXMoKSB7XG4gICAgdGhpcy5oYW5kbGVGb2N1cyhldmVudCk7XG4gIH1cblxuICBjbGVhcigpIHtcbiAgICB0aGlzLnJlbW92ZShldmVudCk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIHNlYXJjaCBxdWVyeVxuICAgKi9cbiAgcHVibGljIHJlbW92ZShlKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLnF1ZXJ5ID0gJyc7XG4gICAgdGhpcy5pbnB1dENsZWFyZWQuZW1pdCgpO1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKHRoaXMucXVlcnkpO1xuICAgIHRoaXMuc2V0UGFuZWxTdGF0ZShlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIGhpc3RvcnlMaXN0IHNlYXJjaFxuICAgKi9cbiAgaW5pdFNlYXJjaEhpc3RvcnkoKSB7XG4gICAgdGhpcy5pc0hpc3RvcnlMaXN0VmlzaWJsZSA9IGZhbHNlO1xuICAgIGlmICh0aGlzLmhpc3RvcnlJZGVudGlmaWVyICYmICF0aGlzLnF1ZXJ5KSB7XG4gICAgICBjb25zdCBoaXN0b3J5ID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKGAke3RoaXMuaGlzdG9yeUlkZW50aWZpZXJ9YCk7XG4gICAgICBpZiAoaGlzdG9yeSkge1xuICAgICAgICB0aGlzLmlzSGlzdG9yeUxpc3RWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5maWx0ZXJlZExpc3QgPSBbXTtcbiAgICAgICAgdGhpcy5oaXN0b3J5TGlzdCA9IGhpc3RvcnkgPyBKU09OLnBhcnNlKGhpc3RvcnkpIDogW107XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmlzSGlzdG9yeUxpc3RWaXNpYmxlID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXNIaXN0b3J5TGlzdFZpc2libGUgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVPcGVuKCkge1xuICAgIGlmICh0aGlzLmlzT3BlbiB8fCB0aGlzLmlzT3BlbiAmJiAhdGhpcy5pc0xvYWRpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gSWYgZGF0YSBleGlzdHNcbiAgICBpZiAodGhpcy5kYXRhICYmIHRoaXMuZGF0YS5sZW5ndGgpIHtcbiAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgICAgIHRoaXMub3ZlcmxheSA9IHRydWU7XG4gICAgICB0aGlzLmZpbHRlckxpc3QoKTtcbiAgICAgIHRoaXMub3BlbmVkLmVtaXQoKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVDbG9zZSgpIHtcbiAgICBpZiAoIXRoaXMuaXNPcGVuKSB7XG4gICAgICB0aGlzLmlzRm9jdXNlZCA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgIHRoaXMub3ZlcmxheSA9IGZhbHNlO1xuICAgIHRoaXMuZmlsdGVyZWRMaXN0ID0gW107XG4gICAgdGhpcy5zZWxlY3RlZElkeCA9IC0xO1xuICAgIHRoaXMubm90Rm91bmQgPSBmYWxzZTtcbiAgICB0aGlzLmlzSGlzdG9yeUxpc3RWaXNpYmxlID0gZmFsc2U7XG4gICAgdGhpcy5pc0ZvY3VzZWQgPSBmYWxzZTtcbiAgICB0aGlzLmNsb3NlZC5lbWl0KCk7XG4gIH1cblxuICBoYW5kbGVGb2N1cyhlKSB7XG4gICAgdGhpcy5zZWFyY2hJbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgaWYgKHRoaXMuaXNGb2N1c2VkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuaW5wdXRGb2N1c2VkLmVtaXQoZSk7XG4gICAgLy8gaWYgZGF0YSBleGlzdHMgdGhlbiBvcGVuXG4gICAgaWYgKHRoaXMuZGF0YSAmJiB0aGlzLmRhdGEubGVuZ3RoKSB7XG4gICAgICB0aGlzLnNldFBhbmVsU3RhdGUoZXZlbnQpO1xuICAgIH1cbiAgICB0aGlzLmlzRm9jdXNlZCA9IHRydWU7XG4gIH1cblxuICBzY3JvbGxUb0VuZCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc1Njcm9sbFRvRW5kKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc2Nyb2xsVG9wID0gdGhpcy5maWx0ZXJlZExpc3RFbGVtZW50Lm5hdGl2ZUVsZW1lbnRcbiAgICAgIC5zY3JvbGxUb3A7XG4gICAgY29uc3Qgc2Nyb2xsSGVpZ2h0ID0gdGhpcy5maWx0ZXJlZExpc3RFbGVtZW50Lm5hdGl2ZUVsZW1lbnRcbiAgICAgIC5zY3JvbGxIZWlnaHQ7XG4gICAgY29uc3QgZWxlbWVudEhlaWdodCA9IHRoaXMuZmlsdGVyZWRMaXN0RWxlbWVudC5uYXRpdmVFbGVtZW50XG4gICAgICAuY2xpZW50SGVpZ2h0O1xuICAgIGNvbnN0IGF0Qm90dG9tID0gc2Nyb2xsSGVpZ2h0ID09PSBzY3JvbGxUb3AgKyBlbGVtZW50SGVpZ2h0O1xuICAgIGlmIChhdEJvdHRvbSkge1xuICAgICAgdGhpcy5zY3JvbGxlZFRvRW5kLmVtaXQoKTtcbiAgICAgIHRoaXMuaXNTY3JvbGxUb0VuZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUga2V5Ym9hcmQgZXZlbnRzXG4gICAqL1xuICBpbml0RXZlbnRTdHJlYW0oKSB7XG4gICAgdGhpcy5pbnB1dEtleVVwJCA9IGZyb21FdmVudChcbiAgICAgIHRoaXMuc2VhcmNoSW5wdXQubmF0aXZlRWxlbWVudCwgJ2tleXVwJ1xuICAgICkucGlwZShtYXAoXG4gICAgICAoZTogYW55KSA9PiBlXG4gICAgKSk7XG5cbiAgICB0aGlzLmlucHV0S2V5RG93biQgPSBmcm9tRXZlbnQoXG4gICAgICB0aGlzLnNlYXJjaElucHV0Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAna2V5ZG93bidcbiAgICApLnBpcGUobWFwKFxuICAgICAgKGU6IGFueSkgPT4gZVxuICAgICkpO1xuXG4gICAgdGhpcy5saXN0ZW5FdmVudFN0cmVhbSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIExpc3RlbiBrZXlib2FyZCBldmVudHNcbiAgICovXG4gIGxpc3RlbkV2ZW50U3RyZWFtKCkge1xuICAgIC8vIGtleSB1cCBldmVudFxuICAgIHRoaXMuaW5wdXRLZXlVcCRcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoZSA9PlxuICAgICAgICAgICFpc0Fycm93VXBEb3duKGUua2V5Q29kZSkgJiZcbiAgICAgICAgICAhaXNFbnRlcihlLmtleUNvZGUpICYmXG4gICAgICAgICAgIWlzRVNDKGUua2V5Q29kZSkgJiZcbiAgICAgICAgICAhaXNUYWIoZS5rZXlDb2RlKSksXG4gICAgICAgIGRlYm91bmNlVGltZSh0aGlzLmRlYm91bmNlVGltZSlcbiAgICAgICkuc3Vic2NyaWJlKGUgPT4ge1xuICAgICAgdGhpcy5vbktleVVwKGUpO1xuICAgIH0pO1xuXG4gICAgLy8gY3Vyc29yIHVwICYgZG93blxuICAgIHRoaXMuaW5wdXRLZXlEb3duJC5waXBlKGZpbHRlcihcbiAgICAgIGUgPT4gaXNBcnJvd1VwRG93bihlLmtleUNvZGUpXG4gICAgKSkuc3Vic2NyaWJlKGUgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5vbkZvY3VzSXRlbShlKTtcbiAgICB9KTtcblxuICAgIC8vIGVudGVyIGtleXVwXG4gICAgdGhpcy5pbnB1dEtleVVwJC5waXBlKGZpbHRlcihlID0+IGlzRW50ZXIoZS5rZXlDb2RlKSkpLnN1YnNjcmliZShlID0+IHtcbiAgICAgIC8vdGhpcy5vbkhhbmRsZUVudGVyKCk7XG4gICAgfSk7XG5cbiAgICAvLyBlbnRlciBrZXlkb3duXG4gICAgdGhpcy5pbnB1dEtleURvd24kLnBpcGUoZmlsdGVyKGUgPT4gaXNFbnRlcihlLmtleUNvZGUpKSkuc3Vic2NyaWJlKGUgPT4ge1xuICAgICAgdGhpcy5vbkhhbmRsZUVudGVyKCk7XG4gICAgfSk7XG5cbiAgICAvLyBFU0NcbiAgICB0aGlzLmlucHV0S2V5VXAkLnBpcGUoXG4gICAgICBmaWx0ZXIoZSA9PiBpc0VTQyhlLmtleUNvZGUpLFxuICAgICAgICBkZWJvdW5jZVRpbWUoMTAwKSlcbiAgICApLnN1YnNjcmliZShlID0+IHtcbiAgICAgIHRoaXMub25Fc2MoKTtcbiAgICB9KTtcblxuICAgIC8vIFRBQlxuICAgIHRoaXMuaW5wdXRLZXlEb3duJC5waXBlKFxuICAgICAgZmlsdGVyKGUgPT4gaXNUYWIoZS5rZXlDb2RlKSlcbiAgICApLnN1YnNjcmliZShlID0+IHtcbiAgICAgIHRoaXMub25UYWIoKTtcbiAgICB9KTtcblxuICAgIC8vIGRlbGV0ZVxuICAgIHRoaXMuaW5wdXRLZXlEb3duJC5waXBlKFxuICAgICAgZmlsdGVyKGUgPT4gaXNCYWNrc3BhY2UoZS5rZXlDb2RlKSB8fCBpc0RlbGV0ZShlLmtleUNvZGUpKVxuICAgICkuc3Vic2NyaWJlKGUgPT4ge1xuICAgICAgdGhpcy5vbkRlbGV0ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIG9uIGtleXVwID09IHdoZW4gaW5wdXQgY2hhbmdlZFxuICAgKiBAcGFyYW0gZSBldmVudFxuICAgKi9cbiAgb25LZXlVcChlKSB7XG4gICAgdGhpcy5ub3RGb3VuZCA9IGZhbHNlOyAvLyBzZWFyY2ggcmVzdWx0cyBhcmUgdW5rbm93biB3aGlsZSB0eXBpbmdcbiAgICAvLyBpZiBpbnB1dCBpcyBlbXB0eVxuICAgIGlmICghdGhpcy5xdWVyeSkge1xuICAgICAgdGhpcy5ub3RGb3VuZCA9IGZhbHNlO1xuICAgICAgdGhpcy5pbnB1dENoYW5nZWQuZW1pdChlLnRhcmdldC52YWx1ZSk7XG4gICAgICB0aGlzLmlucHV0Q2xlYXJlZC5lbWl0KCk7XG4gICAgICAvL3RoaXMuZmlsdGVyTGlzdCgpO1xuICAgICAgdGhpcy5zZXRQYW5lbFN0YXRlKGUpO1xuICAgIH1cbiAgICAvLyBub3RlIHRoYXQgJycgY2FuIGJlIGEgdmFsaWQgcXVlcnlcbiAgICBpZiAoIXRoaXMucXVlcnkgJiYgdGhpcy5xdWVyeSAhPT0gJycpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gaWYgcXVlcnkgPj0gdG8gbWluUXVlcnlMZW5ndGhcbiAgICBpZiAodGhpcy5xdWVyeS5sZW5ndGggPj0gdGhpcy5taW5RdWVyeUxlbmd0aCkge1xuICAgICAgdGhpcy5pbnB1dENoYW5nZWQuZW1pdChlLnRhcmdldC52YWx1ZSk7XG4gICAgICB0aGlzLmZpbHRlckxpc3QoKTtcblxuICAgICAgLy8gSWYgbm8gcmVzdWx0cyBmb3VuZFxuICAgICAgaWYgKCF0aGlzLmZpbHRlcmVkTGlzdC5sZW5ndGggJiYgIXRoaXMuaXNMb2FkaW5nKSB7XG4gICAgICAgIHRoaXMubm90Rm91bmRUZXh0ID8gdGhpcy5ub3RGb3VuZCA9IHRydWUgOiB0aGlzLm5vdEZvdW5kID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogS2V5Ym9hcmQgYXJyb3cgdG9wIGFuZCBhcnJvdyBib3R0b21cbiAgICogQHBhcmFtIGUgZXZlbnRcbiAgICovXG4gIG9uRm9jdXNJdGVtKGUpIHtcbiAgICAvLyBtb3ZlIGFycm93IHVwIGFuZCBkb3duIG9uIGZpbHRlcmVkTGlzdCBvciBoaXN0b3J5TGlzdFxuICAgIGlmICghdGhpcy5oaXN0b3J5TGlzdC5sZW5ndGggfHwgIXRoaXMuaXNIaXN0b3J5TGlzdFZpc2libGUpIHtcbiAgICAgIC8vIGZpbHRlcmVkTGlzdFxuICAgICAgY29uc3QgdG90YWxOdW1JdGVtID0gdGhpcy5maWx0ZXJlZExpc3QubGVuZ3RoO1xuICAgICAgaWYgKGUua2V5ID09PSAnQXJyb3dEb3duJykge1xuICAgICAgICBsZXQgc3VtID0gdGhpcy5zZWxlY3RlZElkeDtcbiAgICAgICAgc3VtID0gKHRoaXMuc2VsZWN0ZWRJZHggPT09IG51bGwpID8gMCA6IHN1bSArIDE7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJZHggPSAodG90YWxOdW1JdGVtICsgc3VtKSAlIHRvdGFsTnVtSXRlbTtcbiAgICAgICAgdGhpcy5zY3JvbGxUb0ZvY3VzZWRJdGVtKHRoaXMuc2VsZWN0ZWRJZHgpO1xuICAgICAgfSBlbHNlIGlmIChlLmtleSA9PT0gJ0Fycm93VXAnKSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkSWR4ID09IC0xKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZElkeCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZWxlY3RlZElkeCA9ICh0b3RhbE51bUl0ZW0gKyB0aGlzLnNlbGVjdGVkSWR4IC0gMSkgJSB0b3RhbE51bUl0ZW07XG4gICAgICAgIHRoaXMuc2Nyb2xsVG9Gb2N1c2VkSXRlbSh0aGlzLnNlbGVjdGVkSWR4KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaGlzdG9yeUxpc3RcbiAgICAgIGNvbnN0IHRvdGFsTnVtSXRlbSA9IHRoaXMuaGlzdG9yeUxpc3QubGVuZ3RoO1xuICAgICAgaWYgKGUua2V5ID09PSAnQXJyb3dEb3duJykge1xuICAgICAgICBsZXQgc3VtID0gdGhpcy5zZWxlY3RlZElkeDtcbiAgICAgICAgc3VtID0gKHRoaXMuc2VsZWN0ZWRJZHggPT09IG51bGwpID8gMCA6IHN1bSArIDE7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJZHggPSAodG90YWxOdW1JdGVtICsgc3VtKSAlIHRvdGFsTnVtSXRlbTtcbiAgICAgICAgdGhpcy5zY3JvbGxUb0ZvY3VzZWRJdGVtKHRoaXMuc2VsZWN0ZWRJZHgpO1xuICAgICAgfSBlbHNlIGlmIChlLmtleSA9PT0gJ0Fycm93VXAnKSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkSWR4ID09IC0xKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZElkeCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZWxlY3RlZElkeCA9ICh0b3RhbE51bUl0ZW0gKyB0aGlzLnNlbGVjdGVkSWR4IC0gMSkgJSB0b3RhbE51bUl0ZW07XG4gICAgICAgIHRoaXMuc2Nyb2xsVG9Gb2N1c2VkSXRlbSh0aGlzLnNlbGVjdGVkSWR4KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2Nyb2xsIHRvIGZvY3VzZWQgaXRlbVxuICAgKiAqIEBwYXJhbSBpbmRleFxuICAgKi9cbiAgc2Nyb2xsVG9Gb2N1c2VkSXRlbShpbmRleCkge1xuICAgIGxldCBsaXN0RWxlbWVudCA9IG51bGw7XG4gICAgLy8gRGVmaW5lIGxpc3QgZWxlbWVudFxuICAgIGlmICghdGhpcy5oaXN0b3J5TGlzdC5sZW5ndGggfHwgIXRoaXMuaXNIaXN0b3J5TGlzdFZpc2libGUpIHtcbiAgICAgIC8vIGZpbHRlcmVkTGlzdCBlbGVtZW50XG4gICAgICBsaXN0RWxlbWVudCA9IHRoaXMuZmlsdGVyZWRMaXN0RWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBoaXN0b3J5TGlzdCBlbGVtZW50XG4gICAgICBsaXN0RWxlbWVudCA9IHRoaXMuaGlzdG9yeUxpc3RFbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgY29uc3QgaXRlbXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChsaXN0RWxlbWVudC5jaGlsZE5vZGVzKS5maWx0ZXIoKG5vZGU6IGFueSkgPT4ge1xuICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDEpIHtcbiAgICAgICAgLy8gaWYgbm9kZSBpcyBlbGVtZW50XG4gICAgICAgIHJldHVybiBub2RlLmNsYXNzTmFtZS5pbmNsdWRlcygnaXRlbScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKCFpdGVtcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBsaXN0SGVpZ2h0ID0gbGlzdEVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgIGNvbnN0IGl0ZW1IZWlnaHQgPSBpdGVtc1tpbmRleF0ub2Zmc2V0SGVpZ2h0O1xuICAgIGNvbnN0IHZpc2libGVUb3AgPSBsaXN0RWxlbWVudC5zY3JvbGxUb3A7XG4gICAgY29uc3QgdmlzaWJsZUJvdHRvbSA9IGxpc3RFbGVtZW50LnNjcm9sbFRvcCArIGxpc3RIZWlnaHQgLSBpdGVtSGVpZ2h0O1xuICAgIGNvbnN0IHRhcmdldFBvc2l0aW9uID0gaXRlbXNbaW5kZXhdLm9mZnNldFRvcDtcblxuICAgIGlmICh0YXJnZXRQb3NpdGlvbiA8IHZpc2libGVUb3ApIHtcbiAgICAgIGxpc3RFbGVtZW50LnNjcm9sbFRvcCA9IHRhcmdldFBvc2l0aW9uO1xuICAgIH1cblxuICAgIGlmICh0YXJnZXRQb3NpdGlvbiA+IHZpc2libGVCb3R0b20pIHtcbiAgICAgIGxpc3RFbGVtZW50LnNjcm9sbFRvcCA9IHRhcmdldFBvc2l0aW9uIC0gbGlzdEhlaWdodCArIGl0ZW1IZWlnaHQ7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdCBpdGVtIG9uIGVudGVyIGNsaWNrXG4gICAqL1xuICBvbkhhbmRsZUVudGVyKCkge1xuICAgIC8vIGNsaWNrIGVudGVyIHRvIGNob29zZSBpdGVtIGZyb20gZmlsdGVyZWRMaXN0IG9yIGhpc3RvcnlMaXN0XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRJZHggPiAtMSkge1xuICAgICAgaWYgKCF0aGlzLmhpc3RvcnlMaXN0Lmxlbmd0aCB8fCAhdGhpcy5pc0hpc3RvcnlMaXN0VmlzaWJsZSkge1xuICAgICAgICAvLyBmaWx0ZXJlZExpc3RcbiAgICAgICAgdGhpcy5xdWVyeSA9ICF0aGlzLmlzVHlwZSh0aGlzLmZpbHRlcmVkTGlzdFt0aGlzLnNlbGVjdGVkSWR4XSlcbiAgICAgICAgICA/IHRoaXMuZmlsdGVyZWRMaXN0W3RoaXMuc2VsZWN0ZWRJZHhdW3RoaXMuc2VhcmNoS2V5d29yZF1cbiAgICAgICAgICA6IHRoaXMuZmlsdGVyZWRMaXN0W3RoaXMuc2VsZWN0ZWRJZHhdO1xuXG4gICAgICAgIHRoaXMuc2F2ZUhpc3RvcnkodGhpcy5maWx0ZXJlZExpc3RbdGhpcy5zZWxlY3RlZElkeF0pO1xuICAgICAgICB0aGlzLnNlbGVjdCh0aGlzLmZpbHRlcmVkTGlzdFt0aGlzLnNlbGVjdGVkSWR4XSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBoaXN0b3J5TGlzdFxuICAgICAgICB0aGlzLnF1ZXJ5ID0gIXRoaXMuaXNUeXBlKHRoaXMuaGlzdG9yeUxpc3RbdGhpcy5zZWxlY3RlZElkeF0pXG4gICAgICAgICAgPyB0aGlzLmhpc3RvcnlMaXN0W3RoaXMuc2VsZWN0ZWRJZHhdW3RoaXMuc2VhcmNoS2V5d29yZF1cbiAgICAgICAgICA6IHRoaXMuaGlzdG9yeUxpc3RbdGhpcy5zZWxlY3RlZElkeF07XG4gICAgICAgIHRoaXMuc2F2ZUhpc3RvcnkodGhpcy5oaXN0b3J5TGlzdFt0aGlzLnNlbGVjdGVkSWR4XSk7XG4gICAgICAgIHRoaXMuc2VsZWN0KHRoaXMuaGlzdG9yeUxpc3RbdGhpcy5zZWxlY3RlZElkeF0pO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmlzSGlzdG9yeUxpc3RWaXNpYmxlID0gZmFsc2U7XG4gICAgdGhpcy5oYW5kbGVDbG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEVzYyBjbGlja1xuICAgKi9cbiAgb25Fc2MoKSB7XG4gICAgdGhpcy5zZWFyY2hJbnB1dC5uYXRpdmVFbGVtZW50LmJsdXIoKTtcbiAgICB0aGlzLmhhbmRsZUNsb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogVGFiIGNsaWNrXG4gICAqL1xuICBvblRhYigpIHtcbiAgICB0aGlzLnNlYXJjaElucHV0Lm5hdGl2ZUVsZW1lbnQuYmx1cigpO1xuICAgIHRoaXMuaGFuZGxlQ2xvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgY2xpY2tcbiAgICovXG4gIG9uRGVsZXRlKCkge1xuICAgIC8vIHBhbmVsIGlzIG9wZW4gb24gZGVsZXRlXG4gICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICB9XG5cblxuICAvKipcbiAgICogU2VsZWN0IGl0ZW0gdG8gc2F2ZSBpbiBsb2NhbFN0b3JhZ2VcbiAgICogQHBhcmFtIHNlbGVjdGVkXG4gICAqL1xuICBzYXZlSGlzdG9yeShzZWxlY3RlZCkge1xuICAgIGlmICh0aGlzLmhpc3RvcnlJZGVudGlmaWVyKSB7XG4gICAgICAvLyBjaGVjayBpZiBzZWxlY3RlZCBpdGVtIGV4aXN0cyBpbiBoaXN0b3J5TGlzdFxuICAgICAgaWYgKCF0aGlzLmhpc3RvcnlMaXN0LnNvbWUoKGl0ZW0pID0+ICF0aGlzLmlzVHlwZShpdGVtKVxuICAgICAgICA/IGl0ZW1bdGhpcy5zZWFyY2hLZXl3b3JkXSA9PSBzZWxlY3RlZFt0aGlzLnNlYXJjaEtleXdvcmRdIDogaXRlbSA9PSBzZWxlY3RlZCkpIHtcbiAgICAgICAgdGhpcy5zYXZlSGlzdG9yeVRvTG9jYWxTdG9yYWdlKFtzZWxlY3RlZCwgLi4udGhpcy5oaXN0b3J5TGlzdF0pO1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIGl0ZW1zIGRvbid0IGV4Y2VlZCBtYXggYWxsb3dlZCBudW1iZXJcbiAgICAgICAgaWYgKHRoaXMuaGlzdG9yeUxpc3QubGVuZ3RoID49IHRoaXMuaGlzdG9yeUxpc3RNYXhOdW1iZXIpIHtcbiAgICAgICAgICB0aGlzLmhpc3RvcnlMaXN0LnNwbGljZSh0aGlzLmhpc3RvcnlMaXN0Lmxlbmd0aCAtIDEsIDEpO1xuICAgICAgICAgIHRoaXMuc2F2ZUhpc3RvcnlUb0xvY2FsU3RvcmFnZShbc2VsZWN0ZWQsIC4uLnRoaXMuaGlzdG9yeUxpc3RdKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gaWYgc2VsZWN0ZWQgaXRlbSBleGlzdHMgaW4gaGlzdG9yeUxpc3Qgc3dhcCB0byB0b3AgaW4gYXJyYXlcbiAgICAgICAgaWYgKCF0aGlzLmlzVHlwZShzZWxlY3RlZCkpIHtcbiAgICAgICAgICAvLyBvYmplY3QgbG9naWNcbiAgICAgICAgICBjb25zdCBjb3BpZWRIaXN0b3J5TGlzdCA9IHRoaXMuaGlzdG9yeUxpc3Quc2xpY2UoKTsgLy8gY29weSBvcmlnaW5hbCBoaXN0b3J5TGlzdCBhcnJheVxuICAgICAgICAgIGNvbnN0IHNlbGVjdGVkSW5kZXggPSBjb3BpZWRIaXN0b3J5TGlzdC5tYXAoKGl0ZW0pID0+IGl0ZW1bdGhpcy5zZWFyY2hLZXl3b3JkXSkuaW5kZXhPZihzZWxlY3RlZFt0aGlzLnNlYXJjaEtleXdvcmRdKTtcbiAgICAgICAgICBjb3BpZWRIaXN0b3J5TGlzdC5zcGxpY2Uoc2VsZWN0ZWRJbmRleCwgMSk7XG4gICAgICAgICAgY29waWVkSGlzdG9yeUxpc3Quc3BsaWNlKDAsIDAsIHNlbGVjdGVkKTtcbiAgICAgICAgICB0aGlzLnNhdmVIaXN0b3J5VG9Mb2NhbFN0b3JhZ2UoWy4uLmNvcGllZEhpc3RvcnlMaXN0XSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gc3RyaW5nIGxvZ2ljXG4gICAgICAgICAgY29uc3QgY29waWVkSGlzdG9yeUxpc3QgPSB0aGlzLmhpc3RvcnlMaXN0LnNsaWNlKCk7IC8vIGNvcHkgb3JpZ2luYWwgaGlzdG9yeUxpc3QgYXJyYXlcbiAgICAgICAgICBjb3BpZWRIaXN0b3J5TGlzdC5zcGxpY2UodGhpcy5oaXN0b3J5TGlzdC5pbmRleE9mKHNlbGVjdGVkKSwgMSk7XG4gICAgICAgICAgY29waWVkSGlzdG9yeUxpc3Quc3BsaWNlKDAsIDAsIHNlbGVjdGVkKTtcbiAgICAgICAgICB0aGlzLnNhdmVIaXN0b3J5VG9Mb2NhbFN0b3JhZ2UoWy4uLmNvcGllZEhpc3RvcnlMaXN0XSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2F2ZSBpdGVtIGluIGxvY2FsU3RvcmFnZVxuICAgKiBAcGFyYW0gc2VsZWN0ZWRcbiAgICovXG4gIHNhdmVIaXN0b3J5VG9Mb2NhbFN0b3JhZ2Uoc2VsZWN0ZWQpIHtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oXG4gICAgICBgJHt0aGlzLmhpc3RvcnlJZGVudGlmaWVyfWAsXG4gICAgICBKU09OLnN0cmluZ2lmeShzZWxlY3RlZClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBpdGVtIGZyb20gbG9jYWxTdG9yYWdlXG4gICAqIEBwYXJhbSBpbmRleFxuICAgKiBAcGFyYW0gZSBldmVudFxuICAgKi9cbiAgcmVtb3ZlSGlzdG9yeUl0ZW0oaW5kZXgsIGUpIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMuaGlzdG9yeUxpc3QgPSB0aGlzLmhpc3RvcnlMaXN0LmZpbHRlcigodiwgaSkgPT4gaSAhPT0gaW5kZXgpO1xuICAgIHRoaXMuc2F2ZUhpc3RvcnlUb0xvY2FsU3RvcmFnZSh0aGlzLmhpc3RvcnlMaXN0KTtcbiAgICBpZiAodGhpcy5oaXN0b3J5TGlzdC5sZW5ndGggPT0gMCkge1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGAke3RoaXMuaGlzdG9yeUlkZW50aWZpZXJ9YCk7XG4gICAgICB0aGlzLmZpbHRlckxpc3QoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgbG9jYWxTdG9yYWdlXG4gICAqIEBwYXJhbSBlIGV2ZW50XG4gICAqL1xuICByZXNldEhpc3RvcnlMaXN0KGUpIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMuaGlzdG9yeUxpc3QgPSBbXTtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oYCR7dGhpcy5oaXN0b3J5SWRlbnRpZmllcn1gKTtcbiAgICB0aGlzLmZpbHRlckxpc3QoKTtcbiAgfVxufVxuIl19