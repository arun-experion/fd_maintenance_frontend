/**
 * @fileoverview added by tsickle
 * Generated from: lib/autocomplete/autocomplete.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ContentChild, ElementRef, EventEmitter, forwardRef, Input, Output, Renderer2, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, filter, map } from 'rxjs/operators';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
/**
 * Keyboard events
 * @type {?}
 */
const isArrowUp = (/**
 * @param {?} keyCode
 * @return {?}
 */
keyCode => keyCode === 38);
const ɵ0 = isArrowUp;
/** @type {?} */
const isArrowDown = (/**
 * @param {?} keyCode
 * @return {?}
 */
keyCode => keyCode === 40);
const ɵ1 = isArrowDown;
/** @type {?} */
const isArrowUpDown = (/**
 * @param {?} keyCode
 * @return {?}
 */
keyCode => isArrowUp(keyCode) || isArrowDown(keyCode));
const ɵ2 = isArrowUpDown;
/** @type {?} */
const isEnter = (/**
 * @param {?} keyCode
 * @return {?}
 */
keyCode => keyCode === 13);
const ɵ3 = isEnter;
/** @type {?} */
const isBackspace = (/**
 * @param {?} keyCode
 * @return {?}
 */
keyCode => keyCode === 8);
const ɵ4 = isBackspace;
/** @type {?} */
const isDelete = (/**
 * @param {?} keyCode
 * @return {?}
 */
keyCode => keyCode === 46);
const ɵ5 = isDelete;
/** @type {?} */
const isESC = (/**
 * @param {?} keyCode
 * @return {?}
 */
keyCode => keyCode === 27);
const ɵ6 = isESC;
/** @type {?} */
const isTab = (/**
 * @param {?} keyCode
 * @return {?}
 */
keyCode => keyCode === 9);
const ɵ7 = isTab;
export class AutocompleteComponent {
    /**
     * @param {?} elementRef
     * @param {?} renderer
     */
    constructor(elementRef, renderer) {
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
        () => {
        });
        this.elementRef = elementRef;
    }
    /**
     * Writes a new value from the form model into the view,
     * Updates model
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.query = value;
    }
    /**
     * Registers a handler that is called when something in the view has changed
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    /**
     * Registers a handler specifically for when a control receives a touch event
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
    }
    /**
     * Event that is called when the value of an input element is changed
     * @param {?} event
     * @return {?}
     */
    onChange(event) {
        this.propagateChange(event.target.value);
    }
    /**
     * Event that is called when the control status changes to or from DISABLED
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.setInitialValue(this.initialValue);
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.initEventStream();
        this.handleScroll();
    }
    /**
     * Set initial value
     * @param {?} value
     * @return {?}
     */
    setInitialValue(value) {
        if (this.initialValue) {
            this.select(value);
        }
    }
    /**
     * Update search results
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes &&
            changes.data &&
            Array.isArray(changes.data.currentValue)) {
            this.handleItemsChange();
            if (!changes.data.firstChange && this.isFocused) {
                this.handleOpen();
            }
        }
    }
    /**
     * Items change
     * @return {?}
     */
    handleItemsChange() {
        this.isScrollToEnd = false;
        if (!this.isOpen) {
            return;
        }
        this.filteredList = this.data;
        this.notFound = !this.filteredList || this.filteredList.length === 0;
    }
    /**
     * Filter data
     * @return {?}
     */
    filterList() {
        this.selectedIdx = -1;
        this.initSearchHistory();
        if (this.query != null && this.data) {
            this.toHighlight = this.query;
            this.filteredList = this.data.filter((/**
             * @param {?} item
             * @return {?}
             */
            (item) => {
                if (typeof item === 'string') {
                    // string logic, check equality of strings
                    return item.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
                }
                else if (typeof item === 'object' && item.constructor === Object) {
                    // object logic, check property equality
                    return item[this.searchKeyword].toLowerCase().indexOf(this.query.toLowerCase()) > -1;
                }
            }));
        }
        else {
            this.notFound = false;
        }
    }
    /**
     * Check type of item in the list.
     * @param {?} item
     * @return {?}
     */
    isType(item) {
        return typeof item === 'string';
    }
    /**
     * Select item in the list.
     * @param {?} item
     * @return {?}
     */
    select(item) {
        this.query = !this.isType(item) ? item[this.searchKeyword] : item;
        this.isOpen = true;
        this.overlay = false;
        this.selected.emit(item);
        this.propagateChange(item);
        if (this.initialValue) {
            // check if history already exists in localStorage and then update
            /** @type {?} */
            const history = window.localStorage.getItem(`${this.historyIdentifier}`);
            if (history) {
                /** @type {?} */
                let existingHistory = JSON.parse(localStorage[`${this.historyIdentifier}`]);
                if (!(existingHistory instanceof Array))
                    existingHistory = [];
                // check if selected item exists in existingHistory
                if (!existingHistory.some((/**
                 * @param {?} existingItem
                 * @return {?}
                 */
                (existingItem) => !this.isType(existingItem)
                    ? existingItem[this.searchKeyword] == item[this.searchKeyword] : existingItem == item))) {
                    existingHistory.unshift(item);
                    localStorage.setItem(`${this.historyIdentifier}`, JSON.stringify(existingHistory));
                    // check if items don't exceed max allowed number
                    if (existingHistory.length >= this.historyListMaxNumber) {
                        existingHistory.splice(existingHistory.length - 1, 1);
                        localStorage.setItem(`${this.historyIdentifier}`, JSON.stringify(existingHistory));
                    }
                }
                else {
                    // if selected item exists in existingHistory swap to top in array
                    if (!this.isType(item)) {
                        // object logic
                        /** @type {?} */
                        const copiedExistingHistory = existingHistory.slice();
                        // copy original existingHistory array
                        /** @type {?} */
                        const selectedIndex = copiedExistingHistory.map((/**
                         * @param {?} el
                         * @return {?}
                         */
                        (el) => el[this.searchKeyword])).indexOf(item[this.searchKeyword]);
                        copiedExistingHistory.splice(selectedIndex, 1);
                        copiedExistingHistory.splice(0, 0, item);
                        localStorage.setItem(`${this.historyIdentifier}`, JSON.stringify(copiedExistingHistory));
                    }
                    else {
                        // string logic
                        /** @type {?} */
                        const copiedExistingHistory = existingHistory.slice();
                        copiedExistingHistory.splice(copiedExistingHistory.indexOf(item), 1);
                        copiedExistingHistory.splice(0, 0, item);
                        localStorage.setItem(`${this.historyIdentifier}`, JSON.stringify(copiedExistingHistory));
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
    }
    /**
     * Document click
     * @param {?} e event
     * @return {?}
     */
    handleClick(e) {
        /** @type {?} */
        let clickedComponent = e.target;
        /** @type {?} */
        let inside = false;
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
    }
    /**
     * Handle body overlay
     * @return {?}
     */
    handleOverlay() {
        this.overlay = false;
    }
    /**
     * Scroll items
     * @return {?}
     */
    handleScroll() {
        this.renderer.listen(this.filteredListElement.nativeElement, 'scroll', (/**
         * @return {?}
         */
        () => {
            this.scrollToEnd();
        }));
    }
    /**
     * Define panel state
     * @param {?} event
     * @return {?}
     */
    setPanelState(event) {
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
    }
    /**
     * Manual controls
     * @return {?}
     */
    open() {
        this.manualOpen = true;
        this.isOpen = false;
        this.handleOpen();
    }
    /**
     * @return {?}
     */
    close() {
        this.manualClose = true;
        this.isOpen = true;
        this.handleClose();
    }
    /**
     * @return {?}
     */
    focus() {
        this.handleFocus(event);
    }
    /**
     * @return {?}
     */
    clear() {
        this.remove(event);
    }
    /**
     * Remove search query
     * @param {?} e
     * @return {?}
     */
    remove(e) {
        e.stopPropagation();
        this.query = '';
        this.inputCleared.emit();
        this.propagateChange(this.query);
        this.setPanelState(e);
    }
    /**
     * Initialize historyList search
     * @return {?}
     */
    initSearchHistory() {
        this.isHistoryListVisible = false;
        if (this.historyIdentifier && !this.query) {
            /** @type {?} */
            const history = window.localStorage.getItem(`${this.historyIdentifier}`);
            if (history) {
                this.isHistoryListVisible = true;
                this.filteredList = [];
                this.historyList = history ? JSON.parse(history) : [];
            }
            else {
                this.isHistoryListVisible = false;
            }
        }
        else {
            this.isHistoryListVisible = false;
        }
    }
    /**
     * @return {?}
     */
    handleOpen() {
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
    }
    /**
     * @return {?}
     */
    handleClose() {
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
    }
    /**
     * @param {?} e
     * @return {?}
     */
    handleFocus(e) {
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
    }
    /**
     * @return {?}
     */
    scrollToEnd() {
        if (this.isScrollToEnd) {
            return;
        }
        /** @type {?} */
        const scrollTop = this.filteredListElement.nativeElement
            .scrollTop;
        /** @type {?} */
        const scrollHeight = this.filteredListElement.nativeElement
            .scrollHeight;
        /** @type {?} */
        const elementHeight = this.filteredListElement.nativeElement
            .clientHeight;
        /** @type {?} */
        const atBottom = scrollHeight === scrollTop + elementHeight;
        if (atBottom) {
            this.scrolledToEnd.emit();
            this.isScrollToEnd = true;
        }
    }
    /**
     * Initialize keyboard events
     * @return {?}
     */
    initEventStream() {
        this.inputKeyUp$ = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(map((/**
         * @param {?} e
         * @return {?}
         */
        (e) => e)));
        this.inputKeyDown$ = fromEvent(this.searchInput.nativeElement, 'keydown').pipe(map((/**
         * @param {?} e
         * @return {?}
         */
        (e) => e)));
        this.listenEventStream();
    }
    /**
     * Listen keyboard events
     * @return {?}
     */
    listenEventStream() {
        // key up event
        this.inputKeyUp$
            .pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        e => !isArrowUpDown(e.keyCode) &&
            !isEnter(e.keyCode) &&
            !isESC(e.keyCode) &&
            !isTab(e.keyCode))), debounceTime(this.debounceTime)).subscribe((/**
         * @param {?} e
         * @return {?}
         */
        e => {
            this.onKeyUp(e);
        }));
        // cursor up & down
        this.inputKeyDown$.pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        e => isArrowUpDown(e.keyCode)))).subscribe((/**
         * @param {?} e
         * @return {?}
         */
        e => {
            e.preventDefault();
            this.onFocusItem(e);
        }));
        // enter keyup
        this.inputKeyUp$.pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        e => isEnter(e.keyCode)))).subscribe((/**
         * @param {?} e
         * @return {?}
         */
        e => {
            //this.onHandleEnter();
        }));
        // enter keydown
        this.inputKeyDown$.pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        e => isEnter(e.keyCode)))).subscribe((/**
         * @param {?} e
         * @return {?}
         */
        e => {
            this.onHandleEnter();
        }));
        // ESC
        this.inputKeyUp$.pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        e => isESC(e.keyCode)), debounceTime(100))).subscribe((/**
         * @param {?} e
         * @return {?}
         */
        e => {
            this.onEsc();
        }));
        // TAB
        this.inputKeyDown$.pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        e => isTab(e.keyCode)))).subscribe((/**
         * @param {?} e
         * @return {?}
         */
        e => {
            this.onTab();
        }));
        // delete
        this.inputKeyDown$.pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        e => isBackspace(e.keyCode) || isDelete(e.keyCode)))).subscribe((/**
         * @param {?} e
         * @return {?}
         */
        e => {
            this.onDelete();
        }));
    }
    /**
     * on keyup == when input changed
     * @param {?} e event
     * @return {?}
     */
    onKeyUp(e) {
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
    }
    /**
     * Keyboard arrow top and arrow bottom
     * @param {?} e event
     * @return {?}
     */
    onFocusItem(e) {
        // move arrow up and down on filteredList or historyList
        if (!this.historyList.length || !this.isHistoryListVisible) {
            // filteredList
            /** @type {?} */
            const totalNumItem = this.filteredList.length;
            if (e.key === 'ArrowDown') {
                /** @type {?} */
                let sum = this.selectedIdx;
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
            const totalNumItem = this.historyList.length;
            if (e.key === 'ArrowDown') {
                /** @type {?} */
                let sum = this.selectedIdx;
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
    }
    /**
     * Scroll to focused item
     * * \@param index
     * @param {?} index
     * @return {?}
     */
    scrollToFocusedItem(index) {
        /** @type {?} */
        let listElement = null;
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
        const items = Array.prototype.slice.call(listElement.childNodes).filter((/**
         * @param {?} node
         * @return {?}
         */
        (node) => {
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
        const listHeight = listElement.offsetHeight;
        /** @type {?} */
        const itemHeight = items[index].offsetHeight;
        /** @type {?} */
        const visibleTop = listElement.scrollTop;
        /** @type {?} */
        const visibleBottom = listElement.scrollTop + listHeight - itemHeight;
        /** @type {?} */
        const targetPosition = items[index].offsetTop;
        if (targetPosition < visibleTop) {
            listElement.scrollTop = targetPosition;
        }
        if (targetPosition > visibleBottom) {
            listElement.scrollTop = targetPosition - listHeight + itemHeight;
        }
    }
    /**
     * Select item on enter click
     * @return {?}
     */
    onHandleEnter() {
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
    }
    /**
     * Esc click
     * @return {?}
     */
    onEsc() {
        this.searchInput.nativeElement.blur();
        this.handleClose();
    }
    /**
     * Tab click
     * @return {?}
     */
    onTab() {
        this.searchInput.nativeElement.blur();
        this.handleClose();
    }
    /**
     * Delete click
     * @return {?}
     */
    onDelete() {
        // panel is open on delete
        this.isOpen = true;
    }
    /**
     * Select item to save in localStorage
     * @param {?} selected
     * @return {?}
     */
    saveHistory(selected) {
        if (this.historyIdentifier) {
            // check if selected item exists in historyList
            if (!this.historyList.some((/**
             * @param {?} item
             * @return {?}
             */
            (item) => !this.isType(item)
                ? item[this.searchKeyword] == selected[this.searchKeyword] : item == selected))) {
                this.saveHistoryToLocalStorage([selected, ...this.historyList]);
                // check if items don't exceed max allowed number
                if (this.historyList.length >= this.historyListMaxNumber) {
                    this.historyList.splice(this.historyList.length - 1, 1);
                    this.saveHistoryToLocalStorage([selected, ...this.historyList]);
                }
            }
            else {
                // if selected item exists in historyList swap to top in array
                if (!this.isType(selected)) {
                    // object logic
                    /** @type {?} */
                    const copiedHistoryList = this.historyList.slice();
                    // copy original historyList array
                    /** @type {?} */
                    const selectedIndex = copiedHistoryList.map((/**
                     * @param {?} item
                     * @return {?}
                     */
                    (item) => item[this.searchKeyword])).indexOf(selected[this.searchKeyword]);
                    copiedHistoryList.splice(selectedIndex, 1);
                    copiedHistoryList.splice(0, 0, selected);
                    this.saveHistoryToLocalStorage([...copiedHistoryList]);
                }
                else {
                    // string logic
                    /** @type {?} */
                    const copiedHistoryList = this.historyList.slice();
                    copiedHistoryList.splice(this.historyList.indexOf(selected), 1);
                    copiedHistoryList.splice(0, 0, selected);
                    this.saveHistoryToLocalStorage([...copiedHistoryList]);
                }
            }
        }
    }
    /**
     * Save item in localStorage
     * @param {?} selected
     * @return {?}
     */
    saveHistoryToLocalStorage(selected) {
        window.localStorage.setItem(`${this.historyIdentifier}`, JSON.stringify(selected));
    }
    /**
     * Remove item from localStorage
     * @param {?} index
     * @param {?} e event
     * @return {?}
     */
    removeHistoryItem(index, e) {
        e.stopPropagation();
        this.historyList = this.historyList.filter((/**
         * @param {?} v
         * @param {?} i
         * @return {?}
         */
        (v, i) => i !== index));
        this.saveHistoryToLocalStorage(this.historyList);
        if (this.historyList.length == 0) {
            window.localStorage.removeItem(`${this.historyIdentifier}`);
            this.filterList();
        }
    }
    /**
     * Reset localStorage
     * @param {?} e event
     * @return {?}
     */
    resetHistoryList(e) {
        e.stopPropagation();
        this.historyList = [];
        window.localStorage.removeItem(`${this.historyIdentifier}`);
        this.filterList();
    }
}
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
                        () => AutocompleteComponent)),
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
AutocompleteComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbmctYXV0b2NvbXBsZXRlLyIsInNvdXJjZXMiOlsibGliL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUVMLFNBQVMsRUFBRSxZQUFZLEVBQ3ZCLFVBQVUsRUFDVixZQUFZLEVBQUUsVUFBVSxFQUN4QixLQUFLLEVBRUwsTUFBTSxFQUNOLFNBQVMsRUFDTSxXQUFXLEVBQzFCLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFNBQVMsRUFBYSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUMsWUFBWSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RCxPQUFPLEVBQXVCLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7Ozs7O01BS2pFLFNBQVM7Ozs7QUFBRyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sS0FBSyxFQUFFLENBQUE7OztNQUNyQyxXQUFXOzs7O0FBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEtBQUssRUFBRSxDQUFBOzs7TUFDdkMsYUFBYTs7OztBQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQTs7O01BQ3JFLE9BQU87Ozs7QUFBRyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sS0FBSyxFQUFFLENBQUE7OztNQUNuQyxXQUFXOzs7O0FBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEtBQUssQ0FBQyxDQUFBOzs7TUFDdEMsUUFBUTs7OztBQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQTs7O01BQ3BDLEtBQUs7Ozs7QUFBRyxPQUFPLENB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LFlBQVksU0FBQyxXQUFXOzs7O0lBbEZ6Qiw0Q0FBa0Q7O0lBQ2xELG9EQUFrRTs7SUFDbEUsbURBQWdFOztJQUVoRSw0Q0FBNkI7O0lBQzdCLDhDQUErQjs7SUFFL0Isc0NBQWtCOztJQUNsQiw2Q0FBeUI7O0lBQ3pCLDRDQUF3Qjs7SUFDeEIscURBQW1DOztJQUNuQywyQ0FBa0I7O0lBQ2xCLDRDQUF3Qjs7SUFDeEIsNENBQWdDOztJQUNoQyx5Q0FBd0I7O0lBQ3hCLDBDQUF5Qjs7SUFDekIsdUNBQXNCOztJQUN0Qiw4Q0FBNkI7O0lBQzdCLHdDQUF1Qjs7Ozs7SUFDdkIsMkNBQStCOzs7OztJQUMvQiw0Q0FBZ0M7Ozs7OztJQVFoQyxxQ0FBMEI7O0lBQzFCLDhDQUFzQzs7SUFDdEMsNENBQWlDOztJQUNqQyx3Q0FBNkI7O0lBQzdCLDZDQUFrQzs7Ozs7Ozs7SUFPbEMsa0RBQTBDOzs7Ozs7SUFLMUMsK0NBQXFEOztJQUNyRCxxREFBMEM7O0lBQzFDLDZDQUEyQzs7SUFDM0MsMENBQW1DOztJQUNuQyw2Q0FBa0M7O0lBQ2xDLHlDQUFrQzs7Ozs7SUFJbEMsK0NBQW1DOzs7OztJQUtuQyx5Q0FBNkM7Ozs7O0lBRzdDLDZDQUFpRDs7Ozs7SUFHakQsNkNBQStFOzs7OztJQUcvRSw2Q0FBK0U7Ozs7O0lBRy9FLHVDQUF5RTs7Ozs7SUFHekUsdUNBQXlFOzs7OztJQUd6RSw4Q0FBZ0Y7O0lBSWhGLDZDQUEwQzs7SUFDMUMsaURBQThDOztJQUM5QywrQ0FBOEQ7Ozs7O0lBSzlELGdEQUNFOzs7OztJQStCa0MseUNBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZixcbiAgSW5wdXQsIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFJlbmRlcmVyMixcbiAgU2ltcGxlQ2hhbmdlcywgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2Zyb21FdmVudCwgT2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2RlYm91bmNlVGltZSwgZmlsdGVyLCBtYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbi8qKlxuICogS2V5Ym9hcmQgZXZlbnRzXG4gKi9cbmNvbnN0IGlzQXJyb3dVcCA9IGtleUNvZGUgPT4ga2V5Q29kZSA9PT0gMzg7XG5jb25zdCBpc0Fycm93RG93biA9IGtleUNvZGUgPT4ga2V5Q29kZSA9PT0gNDA7XG5jb25zdCBpc0Fycm93VXBEb3duID0ga2V5Q29kZSA9PiBpc0Fycm93VXAoa2V5Q29kZSkgfHwgaXNBcnJvd0Rvd24oa2V5Q29kZSk7XG5jb25zdCBpc0VudGVyID0ga2V5Q29kZSA9PiBrZXlDb2RlID09PSAxMztcbmNvbnN0IGlzQmFja3NwYWNlID0ga2V5Q29kZSA9PiBrZXlDb2RlID09PSA4O1xuY29uc3QgaXNEZWxldGUgPSBrZXlDb2RlID0+IGtleUNvZGUgPT09IDQ2O1xuY29uc3QgaXNFU0MgPSBrZXlDb2RlID0+IGtleUNvZGUgPT09IDI3O1xuY29uc3QgaXNUYWIgPSBrZXlDb2RlID0+IGtleUNvZGUgPT09IDk7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctYXV0b2NvbXBsZXRlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2F1dG9jb21wbGV0ZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2F1dG9jb21wbGV0ZS5jb21wb25lbnQuc2NzcyddLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEF1dG9jb21wbGV0ZUNvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZVxuICAgIH1cbiAgXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgaG9zdDoge1xuICAgICcoZG9jdW1lbnQ6Y2xpY2spJzogJ2hhbmRsZUNsaWNrKCRldmVudCknLFxuICAgICdjbGFzcyc6ICduZy1hdXRvY29tcGxldGUnXG4gIH0sXG59KVxuXG5leHBvcnQgY2xhc3MgQXV0b2NvbXBsZXRlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgQFZpZXdDaGlsZCgnc2VhcmNoSW5wdXQnKSBzZWFyY2hJbnB1dDogRWxlbWVudFJlZjsgLy8gaW5wdXQgZWxlbWVudFxuICBAVmlld0NoaWxkKCdmaWx0ZXJlZExpc3RFbGVtZW50JykgZmlsdGVyZWRMaXN0RWxlbWVudDogRWxlbWVudFJlZjsgLy8gZWxlbWVudCBvZiBpdGVtc1xuICBAVmlld0NoaWxkKCdoaXN0b3J5TGlzdEVsZW1lbnQnKSBoaXN0b3J5TGlzdEVsZW1lbnQ6IEVsZW1lbnRSZWY7IC8vIGVsZW1lbnQgb2YgaGlzdG9yeSBpdGVtc1xuXG4gIGlucHV0S2V5VXAkOiBPYnNlcnZhYmxlPGFueT47IC8vIGlucHV0IGV2ZW50c1xuICBpbnB1dEtleURvd24kOiBPYnNlcnZhYmxlPGFueT47IC8vIGlucHV0IGV2ZW50c1xuXG4gIHB1YmxpYyBxdWVyeSA9ICcnOyAvLyBzZWFyY2ggcXVlcnlcbiAgcHVibGljIGZpbHRlcmVkTGlzdCA9IFtdOyAvLyBsaXN0IG9mIGl0ZW1zXG4gIHB1YmxpYyBoaXN0b3J5TGlzdCA9IFtdOyAvLyBsaXN0IG9mIGhpc3RvcnkgaXRlbXNcbiAgcHVibGljIGlzSGlzdG9yeUxpc3RWaXNpYmxlID0gdHJ1ZTtcbiAgcHVibGljIGVsZW1lbnRSZWY7XG4gIHB1YmxpYyBzZWxlY3RlZElkeCA9IC0xO1xuICBwdWJsaWMgdG9IaWdobGlnaHQ6IHN0cmluZyA9ICcnO1xuICBwdWJsaWMgbm90Rm91bmQgPSBmYWxzZTtcbiAgcHVibGljIGlzRm9jdXNlZCA9IGZhbHNlO1xuICBwdWJsaWMgaXNPcGVuID0gZmFsc2U7XG4gIHB1YmxpYyBpc1Njcm9sbFRvRW5kID0gZmFsc2U7XG4gIHB1YmxpYyBvdmVybGF5ID0gZmFsc2U7XG4gIHByaXZhdGUgbWFudWFsT3BlbiA9IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBtYW51YWxDbG9zZSA9IHVuZGVmaW5lZDtcblxuXG4gIC8vIEBJbnB1dHNcbiAgLyoqXG4gICAqIERhdGEgb2YgaXRlbXMgbGlzdC5cbiAgICogSXQgY2FuIGJlIGFycmF5IG9mIHN0cmluZ3Mgb3IgYXJyYXkgb2Ygb2JqZWN0cy5cbiAgICovXG4gIEBJbnB1dCgpIHB1YmxpYyBkYXRhID0gW107XG4gIEBJbnB1dCgpIHB1YmxpYyBzZWFyY2hLZXl3b3JkOiBzdHJpbmc7IC8vIGtleXdvcmQgdG8gZmlsdGVyIHRoZSBsaXN0XG4gIEBJbnB1dCgpIHB1YmxpYyBwbGFjZUhvbGRlciA9ICcnOyAvLyBpbnB1dCBwbGFjZWhvbGRlclxuICBASW5wdXQoKSBwdWJsaWMgaGVhZGluZyA9ICcnO1xuICBASW5wdXQoKSBwdWJsaWMgaW5pdGlhbFZhbHVlOiBhbnk7IC8vIHNldCBpbml0aWFsIHZhbHVlXG4gIC8qKlxuICAgKiBIaXN0b3J5IGlkZW50aWZpZXIgb2YgaGlzdG9yeSBsaXN0XG4gICAqIFdoZW4gdmFsaWQgaGlzdG9yeSBpZGVudGlmaWVyIGlzIGdpdmVuLCB0aGVuIGNvbXBvbmVudCBzdG9yZXMgc2VsZWN0ZWQgaXRlbSB0byBsb2NhbCBzdG9yYWdlIG9mIHVzZXIncyBicm93c2VyLlxuICAgKiBJZiBpdCBpcyBudWxsIHRoZW4gaGlzdG9yeSBpcyBoaWRkZW4uXG4gICAqIEhpc3RvcnkgbGlzdCBpcyB2aXNpYmxlIGlmIGF0IGxlYXN0IG9uZSBoaXN0b3J5IGl0ZW0gaXMgc3RvcmVkLlxuICAgKi9cbiAgQElucHV0KCkgcHVibGljIGhpc3RvcnlJZGVudGlmaWVyOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBIZWFkaW5nIHRleHQgb2YgaGlzdG9yeSBsaXN0LlxuICAgKiBJZiBpdCBpcyBudWxsIHRoZW4gaGlzdG9yeSBoZWFkaW5nIGlzIGhpZGRlbi5cbiAgICovXG4gIEBJbnB1dCgpIHB1YmxpYyBoaXN0b3J5SGVhZGluZyA9ICdSZWNlbnRseSBzZWxlY3RlZCc7XG4gIEBJbnB1dCgpIHB1YmxpYyBoaXN0b3J5TGlzdE1heE51bWJlciA9IDE1OyAvLyBtYXhpbXVtIG51bWJlciBvZiBpdGVtcyBpbiB0aGUgaGlzdG9yeSBsaXN0LlxuICBASW5wdXQoKSBwdWJsaWMgbm90Rm91bmRUZXh0ID0gJ05vdCBmb3VuZCc7IC8vIHNldCBjdXN0b20gdGV4dCB3aGVuIGZpbHRlciByZXR1cm5zIGVtcHR5IHJlc3VsdFxuICBASW5wdXQoKSBwdWJsaWMgaXNMb2FkaW5nOiBib29sZWFuOyAvLyBsb2FkaW5nIG1hc2tcbiAgQElucHV0KCkgcHVibGljIGRlYm91bmNlVGltZTogNDAwOyAvLyBkZWxheSB0aW1lIHdoaWxlIHR5cGluZ1xuICBASW5wdXQoKSBwdWJsaWMgZGlzYWJsZWQ6IGJvb2xlYW47IC8vIGlucHV0IGRpc2FibGUvZW5hYmxlXG4gIC8qKlxuICAgKiBUaGUgbWluaW11bSBudW1iZXIgb2YgY2hhcmFjdGVycyB0aGUgdXNlciBtdXN0IHR5cGUgYmVmb3JlIGEgc2VhcmNoIGlzIHBlcmZvcm1lZC5cbiAgICovXG4gIEBJbnB1dCgpIHB1YmxpYyBtaW5RdWVyeUxlbmd0aCA9IDE7XG5cblxuICAvLyBAT3V0cHV0IGV2ZW50c1xuICAvKiogRXZlbnQgdGhhdCBpcyBlbWl0dGVkIHdoZW5ldmVyIGFuIGl0ZW0gZnJvbSB0aGUgbGlzdCBpcyBzZWxlY3RlZC4gKi9cbiAgQE91dHB1dCgpIHNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgLyoqIEV2ZW50IHRoYXQgaXMgZW1pdHRlZCB3aGVuZXZlciBhbiBpbnB1dCBpcyBjaGFuZ2VkLiAqL1xuICBAT3V0cHV0KCkgaW5wdXRDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgLyoqIEV2ZW50IHRoYXQgaXMgZW1pdHRlZCB3aGVuZXZlciBhbiBpbnB1dCBpcyBmb2N1c2VkLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgaW5wdXRGb2N1c2VkOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgLyoqIEV2ZW50IHRoYXQgaXMgZW1pdHRlZCB3aGVuZXZlciBhbiBpbnB1dCBpcyBjbGVhcmVkLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgaW5wdXRDbGVhcmVkOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgLyoqIEV2ZW50IHRoYXQgaXMgZW1pdHRlZCB3aGVuIHRoZSBhdXRvY29tcGxldGUgcGFuZWwgaXMgb3BlbmVkLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgb3BlbmVkOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgLyoqIEV2ZW50IHRoYXQgaXMgZW1pdHRlZCB3aGVuIHRoZSBhdXRvY29tcGxldGUgcGFuZWwgaXMgY2xvc2VkLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgY2xvc2VkOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgLyoqIEV2ZW50IHRoYXQgaXMgZW1pdHRlZCB3aGVuIHNjcm9sbGVkIHRvIHRoZSBlbmQgb2YgaXRlbXMuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBzY3JvbGxlZFRvRW5kOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cblxuICAvLyBDdXN0b20gdGVtcGxhdGVzXG4gIEBJbnB1dCgpIGl0ZW1UZW1wbGF0ZSAhOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBASW5wdXQoKSBub3RGb3VuZFRlbXBsYXRlICE6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIGN1c3RvbVRlbXBsYXRlICE6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqXG4gICAqIFByb3BhZ2F0ZXMgbmV3IHZhbHVlIHdoZW4gbW9kZWwgY2hhbmdlc1xuICAgKi9cbiAgcHJvcGFnYXRlQ2hhbmdlOiBhbnkgPSAoKSA9PiB7XG4gIH07XG5cblxuICAvKipcbiAgICogV3JpdGVzIGEgbmV3IHZhbHVlIGZyb20gdGhlIGZvcm0gbW9kZWwgaW50byB0aGUgdmlldyxcbiAgICogVXBkYXRlcyBtb2RlbFxuICAgKi9cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5xdWVyeSA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhIGhhbmRsZXIgdGhhdCBpcyBjYWxsZWQgd2hlbiBzb21ldGhpbmcgaW4gdGhlIHZpZXcgaGFzIGNoYW5nZWRcbiAgICovXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm4pIHtcbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSA9IGZuO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhIGhhbmRsZXIgc3BlY2lmaWNhbGx5IGZvciB3aGVuIGEgY29udHJvbCByZWNlaXZlcyBhIHRvdWNoIGV2ZW50XG4gICAqL1xuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICB9XG5cbiAgLyoqXG4gICAqIEV2ZW50IHRoYXQgaXMgY2FsbGVkIHdoZW4gdGhlIHZhbHVlIG9mIGFuIGlucHV0IGVsZW1lbnQgaXMgY2hhbmdlZFxuICAgKi9cbiAgb25DaGFuZ2UoZXZlbnQpIHtcbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZShldmVudC50YXJnZXQudmFsdWUpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gICAgdGhpcy5lbGVtZW50UmVmID0gZWxlbWVudFJlZjtcbiAgfVxuXG4gIC8qKlxuICAgKiBFdmVudCB0aGF0IGlzIGNhbGxlZCB3aGVuIHRoZSBjb250cm9sIHN0YXR1cyBjaGFuZ2VzIHRvIG9yIGZyb20gRElTQUJMRURcbiAgICovXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zZXRJbml0aWFsVmFsdWUodGhpcy5pbml0aWFsVmFsdWUpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuaW5pdEV2ZW50U3RyZWFtKCk7XG4gICAgdGhpcy5oYW5kbGVTY3JvbGwoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgaW5pdGlhbCB2YWx1ZVxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICovXG4gIHB1YmxpYyBzZXRJbml0aWFsVmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmICh0aGlzLmluaXRpYWxWYWx1ZSkge1xuICAgICAgdGhpcy5zZWxlY3QodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgc2VhcmNoIHJlc3VsdHNcbiAgICovXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoXG4gICAgICBjaGFuZ2VzICYmXG4gICAgICBjaGFuZ2VzLmRhdGEgJiZcbiAgICAgIEFycmF5LmlzQXJyYXkoY2hhbmdlcy5kYXRhLmN1cnJlbnRWYWx1ZSlcbiAgICApIHtcbiAgICAgIHRoaXMuaGFuZGxlSXRlbXNDaGFuZ2UoKTtcbiAgICAgIGlmICghY2hhbmdlcy5kYXRhLmZpcnN0Q2hhbmdlICYmIHRoaXMuaXNGb2N1c2VkKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlT3BlbigpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJdGVtcyBjaGFuZ2VcbiAgICovXG4gIHB1YmxpYyBoYW5kbGVJdGVtc0NoYW5nZSgpIHtcbiAgICB0aGlzLmlzU2Nyb2xsVG9FbmQgPSBmYWxzZTtcbiAgICBpZiAoIXRoaXMuaXNPcGVuKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5maWx0ZXJlZExpc3QgPSB0aGlzLmRhdGE7XG4gICAgdGhpcy5ub3RGb3VuZCA9ICF0aGlzLmZpbHRlcmVkTGlzdCB8fCB0aGlzLmZpbHRlcmVkTGlzdC5sZW5ndGggPT09IDA7XG4gIH1cblxuICAvKipcbiAgICogRmlsdGVyIGRhdGFcbiAgICovXG4gIHB1YmxpYyBmaWx0ZXJMaXN0KCkge1xuICAgIHRoaXMuc2VsZWN0ZWRJZHggPSAtMTtcbiAgICB0aGlzLmluaXRTZWFyY2hIaXN0b3J5KCk7XG4gICAgaWYgKHRoaXMucXVlcnkgIT0gbnVsbCAmJiB0aGlzLmRhdGEpIHtcbiAgICAgIHRoaXMudG9IaWdobGlnaHQgPSB0aGlzLnF1ZXJ5O1xuICAgICAgdGhpcy5maWx0ZXJlZExpc3QgPSB0aGlzLmRhdGEuZmlsdGVyKChpdGVtOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIC8vIHN0cmluZyBsb2dpYywgY2hlY2sgZXF1YWxpdHkgb2Ygc3RyaW5nc1xuICAgICAgICAgIHJldHVybiBpdGVtLnRvTG93ZXJDYXNlKCkuaW5kZXhPZih0aGlzLnF1ZXJ5LnRvTG93ZXJDYXNlKCkpID4gLTE7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGl0ZW0gPT09ICdvYmplY3QnICYmIGl0ZW0uY29uc3RydWN0b3IgPT09IE9iamVjdCkge1xuICAgICAgICAgIC8vIG9iamVjdCBsb2dpYywgY2hlY2sgcHJvcGVydHkgZXF1YWxpdHlcbiAgICAgICAgICByZXR1cm4gaXRlbVt0aGlzLnNlYXJjaEtleXdvcmRdLnRvTG93ZXJDYXNlKCkuaW5kZXhPZih0aGlzLnF1ZXJ5LnRvTG93ZXJDYXNlKCkpID4gLTE7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm5vdEZvdW5kID0gZmFsc2U7XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogQ2hlY2sgdHlwZSBvZiBpdGVtIGluIHRoZSBsaXN0LlxuICAgKiBAcGFyYW0gaXRlbVxuICAgKi9cbiAgaXNUeXBlKGl0ZW0pIHtcbiAgICByZXR1cm4gdHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdCBpdGVtIGluIHRoZSBsaXN0LlxuICAgKiBAcGFyYW0gaXRlbVxuICAgKi9cbiAgcHVibGljIHNlbGVjdChpdGVtKSB7XG4gICAgdGhpcy5xdWVyeSA9ICF0aGlzLmlzVHlwZShpdGVtKSA/IGl0ZW1bdGhpcy5zZWFyY2hLZXl3b3JkXSA6IGl0ZW07XG4gICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgIHRoaXMub3ZlcmxheSA9IGZhbHNlO1xuICAgIHRoaXMuc2VsZWN0ZWQuZW1pdChpdGVtKTtcbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZShpdGVtKTtcblxuICAgIGlmICh0aGlzLmluaXRpYWxWYWx1ZSkge1xuICAgICAgLy8gY2hlY2sgaWYgaGlzdG9yeSBhbHJlYWR5IGV4aXN0cyBpbiBsb2NhbFN0b3JhZ2UgYW5kIHRoZW4gdXBkYXRlXG4gICAgICBjb25zdCBoaXN0b3J5ID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKGAke3RoaXMuaGlzdG9yeUlkZW50aWZpZXJ9YCk7XG4gICAgICBpZiAoaGlzdG9yeSkge1xuICAgICAgICBsZXQgZXhpc3RpbmdIaXN0b3J5ID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2VbYCR7dGhpcy5oaXN0b3J5SWRlbnRpZmllcn1gXSk7XG4gICAgICAgIGlmICghKGV4aXN0aW5nSGlzdG9yeSBpbnN0YW5jZW9mIEFycmF5KSkgZXhpc3RpbmdIaXN0b3J5ID0gW107XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgc2VsZWN0ZWQgaXRlbSBleGlzdHMgaW4gZXhpc3RpbmdIaXN0b3J5XG4gICAgICAgIGlmICghZXhpc3RpbmdIaXN0b3J5LnNvbWUoKGV4aXN0aW5nSXRlbSkgPT4gIXRoaXMuaXNUeXBlKGV4aXN0aW5nSXRlbSlcbiAgICAgICAgICA/IGV4aXN0aW5nSXRlbVt0aGlzLnNlYXJjaEtleXdvcmRdID09IGl0ZW1bdGhpcy5zZWFyY2hLZXl3b3JkXSA6IGV4aXN0aW5nSXRlbSA9PSBpdGVtKSkge1xuICAgICAgICAgIGV4aXN0aW5nSGlzdG9yeS51bnNoaWZ0KGl0ZW0pO1xuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGAke3RoaXMuaGlzdG9yeUlkZW50aWZpZXJ9YCwgSlNPTi5zdHJpbmdpZnkoZXhpc3RpbmdIaXN0b3J5KSk7XG5cbiAgICAgICAgICAvLyBjaGVjayBpZiBpdGVtcyBkb24ndCBleGNlZWQgbWF4IGFsbG93ZWQgbnVtYmVyXG4gICAgICAgICAgaWYgKGV4aXN0aW5nSGlzdG9yeS5sZW5ndGggPj0gdGhpcy5oaXN0b3J5TGlzdE1heE51bWJlcikge1xuICAgICAgICAgICAgZXhpc3RpbmdIaXN0b3J5LnNwbGljZShleGlzdGluZ0hpc3RvcnkubGVuZ3RoIC0gMSwgMSk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgJHt0aGlzLmhpc3RvcnlJZGVudGlmaWVyfWAsIEpTT04uc3RyaW5naWZ5KGV4aXN0aW5nSGlzdG9yeSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBpZiBzZWxlY3RlZCBpdGVtIGV4aXN0cyBpbiBleGlzdGluZ0hpc3Rvcnkgc3dhcCB0byB0b3AgaW4gYXJyYXlcbiAgICAgICAgICBpZiAoIXRoaXMuaXNUeXBlKGl0ZW0pKSB7XG4gICAgICAgICAgICAvLyBvYmplY3QgbG9naWNcbiAgICAgICAgICAgIGNvbnN0IGNvcGllZEV4aXN0aW5nSGlzdG9yeSA9IGV4aXN0aW5nSGlzdG9yeS5zbGljZSgpOyAvLyBjb3B5IG9yaWdpbmFsIGV4aXN0aW5nSGlzdG9yeSBhcnJheVxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRJbmRleCA9IGNvcGllZEV4aXN0aW5nSGlzdG9yeS5tYXAoKGVsKSA9PiBlbFt0aGlzLnNlYXJjaEtleXdvcmRdKS5pbmRleE9mKGl0ZW1bdGhpcy5zZWFyY2hLZXl3b3JkXSk7XG4gICAgICAgICAgICBjb3BpZWRFeGlzdGluZ0hpc3Rvcnkuc3BsaWNlKHNlbGVjdGVkSW5kZXgsIDEpO1xuICAgICAgICAgICAgY29waWVkRXhpc3RpbmdIaXN0b3J5LnNwbGljZSgwLCAwLCBpdGVtKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGAke3RoaXMuaGlzdG9yeUlkZW50aWZpZXJ9YCwgSlNPTi5zdHJpbmdpZnkoY29waWVkRXhpc3RpbmdIaXN0b3J5KSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHN0cmluZyBsb2dpY1xuICAgICAgICAgICAgY29uc3QgY29waWVkRXhpc3RpbmdIaXN0b3J5ID0gZXhpc3RpbmdIaXN0b3J5LnNsaWNlKCk7IC8vIGNvcHkgb3JpZ2luYWwgZXhpc3RpbmdIaXN0b3J5IGFycmF5XG4gICAgICAgICAgICBjb3BpZWRFeGlzdGluZ0hpc3Rvcnkuc3BsaWNlKGNvcGllZEV4aXN0aW5nSGlzdG9yeS5pbmRleE9mKGl0ZW0pLCAxKTtcbiAgICAgICAgICAgIGNvcGllZEV4aXN0aW5nSGlzdG9yeS5zcGxpY2UoMCwgMCwgaXRlbSk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgJHt0aGlzLmhpc3RvcnlJZGVudGlmaWVyfWAsIEpTT04uc3RyaW5naWZ5KGNvcGllZEV4aXN0aW5nSGlzdG9yeSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zYXZlSGlzdG9yeShpdGVtKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zYXZlSGlzdG9yeShpdGVtKTtcbiAgICB9XG4gICAgdGhpcy5oYW5kbGVDbG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIERvY3VtZW50IGNsaWNrXG4gICAqIEBwYXJhbSBlIGV2ZW50XG4gICAqL1xuICBwdWJsaWMgaGFuZGxlQ2xpY2soZSkge1xuICAgIGxldCBjbGlja2VkQ29tcG9uZW50ID0gZS50YXJnZXQ7XG4gICAgbGV0IGluc2lkZSA9IGZhbHNlO1xuICAgIGRvIHtcbiAgICAgIGlmIChjbGlja2VkQ29tcG9uZW50ID09PSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkge1xuICAgICAgICBpbnNpZGUgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy5maWx0ZXJlZExpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5oYW5kbGVPcGVuKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNsaWNrZWRDb21wb25lbnQgPSBjbGlja2VkQ29tcG9uZW50LnBhcmVudE5vZGU7XG4gICAgfSB3aGlsZSAoY2xpY2tlZENvbXBvbmVudCk7XG4gICAgaWYgKCFpbnNpZGUpIHtcbiAgICAgIHRoaXMuaGFuZGxlQ2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlIGJvZHkgb3ZlcmxheVxuICAgKi9cbiAgaGFuZGxlT3ZlcmxheSgpIHtcbiAgICB0aGlzLm92ZXJsYXkgPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTY3JvbGwgaXRlbXNcbiAgICovXG4gIHB1YmxpYyBoYW5kbGVTY3JvbGwoKSB7XG4gICAgdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5maWx0ZXJlZExpc3RFbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdzY3JvbGwnLCAoKSA9PiB7XG4gICAgICB0aGlzLnNjcm9sbFRvRW5kKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lIHBhbmVsIHN0YXRlXG4gICAqL1xuICBzZXRQYW5lbFN0YXRlKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gICAgLy8gSWYgY29udHJvbHMgYXJlIHVudG91Y2hlZFxuICAgIGlmICh0eXBlb2YgdGhpcy5tYW51YWxPcGVuID09PSAndW5kZWZpbmVkJ1xuICAgICAgJiYgdHlwZW9mIHRoaXMubWFudWFsQ2xvc2UgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgICAgdGhpcy5oYW5kbGVPcGVuKCk7XG4gICAgfVxuXG4gICAgLy8gSWYgb25lIG9mIHRoZSBjb250cm9scyBpcyB1bnRvdWNoZWQgYW5kIG90aGVyIGlzIGRlYWN0aXZhdGVkXG4gICAgaWYgKHR5cGVvZiB0aGlzLm1hbnVhbE9wZW4gPT09ICd1bmRlZmluZWQnXG4gICAgICAmJiB0aGlzLm1hbnVhbENsb3NlID09PSBmYWxzZVxuICAgICAgfHwgdHlwZW9mIHRoaXMubWFudWFsQ2xvc2UgPT09ICd1bmRlZmluZWQnXG4gICAgICAmJiB0aGlzLm1hbnVhbE9wZW4gPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgICAgdGhpcy5oYW5kbGVPcGVuKCk7XG4gICAgfVxuXG4gICAgLy8gaWYgY29udHJvbHMgYXJlIHRvdWNoZWQgYnV0IGJvdGggYXJlIGRlYWN0aXZhdGVkXG4gICAgaWYgKHRoaXMubWFudWFsT3BlbiA9PT0gZmFsc2UgJiYgdGhpcy5tYW51YWxDbG9zZSA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgICB0aGlzLmhhbmRsZU9wZW4oKTtcbiAgICB9XG5cbiAgICAvLyBpZiBvcGVuIGNvbnRyb2wgaXMgdG91Y2hlZCBhbmQgYWN0aXZhdGVkXG4gICAgaWYgKHRoaXMubWFudWFsT3Blbikge1xuICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICAgIHRoaXMuaGFuZGxlT3BlbigpO1xuICAgICAgdGhpcy5tYW51YWxPcGVuID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gaWYgY2xvc2UgY29udHJvbCBpcyB0b3VjaGVkIGFuZCBhY3RpdmF0ZWRcbiAgICBpZiAodGhpcy5tYW51YWxDbG9zZSkge1xuICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgICAgdGhpcy5oYW5kbGVDbG9zZSgpO1xuICAgICAgdGhpcy5tYW51YWxDbG9zZSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNYW51YWwgY29udHJvbHNcbiAgICovXG4gIG9wZW4oKSB7XG4gICAgdGhpcy5tYW51YWxPcGVuID0gdHJ1ZTtcbiAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgIHRoaXMuaGFuZGxlT3BlbigpO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5tYW51YWxDbG9zZSA9IHRydWU7XG4gICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgIHRoaXMuaGFuZGxlQ2xvc2UoKTtcbiAgfVxuXG4gIGZvY3VzKCkge1xuICAgIHRoaXMuaGFuZGxlRm9jdXMoZXZlbnQpO1xuICB9XG5cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5yZW1vdmUoZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBzZWFyY2ggcXVlcnlcbiAgICovXG4gIHB1YmxpYyByZW1vdmUoZSkge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5xdWVyeSA9ICcnO1xuICAgIHRoaXMuaW5wdXRDbGVhcmVkLmVtaXQoKTtcbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSh0aGlzLnF1ZXJ5KTtcbiAgICB0aGlzLnNldFBhbmVsU3RhdGUoZSk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSBoaXN0b3J5TGlzdCBzZWFyY2hcbiAgICovXG4gIGluaXRTZWFyY2hIaXN0b3J5KCkge1xuICAgIHRoaXMuaXNIaXN0b3J5TGlzdFZpc2libGUgPSBmYWxzZTtcbiAgICBpZiAodGhpcy5oaXN0b3J5SWRlbnRpZmllciAmJiAhdGhpcy5xdWVyeSkge1xuICAgICAgY29uc3QgaGlzdG9yeSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShgJHt0aGlzLmhpc3RvcnlJZGVudGlmaWVyfWApO1xuICAgICAgaWYgKGhpc3RvcnkpIHtcbiAgICAgICAgdGhpcy5pc0hpc3RvcnlMaXN0VmlzaWJsZSA9IHRydWU7XG4gICAgICAgIHRoaXMuZmlsdGVyZWRMaXN0ID0gW107XG4gICAgICAgIHRoaXMuaGlzdG9yeUxpc3QgPSBoaXN0b3J5ID8gSlNPTi5wYXJzZShoaXN0b3J5KSA6IFtdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5pc0hpc3RvcnlMaXN0VmlzaWJsZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmlzSGlzdG9yeUxpc3RWaXNpYmxlID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlT3BlbigpIHtcbiAgICBpZiAodGhpcy5pc09wZW4gfHwgdGhpcy5pc09wZW4gJiYgIXRoaXMuaXNMb2FkaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIElmIGRhdGEgZXhpc3RzXG4gICAgaWYgKHRoaXMuZGF0YSAmJiB0aGlzLmRhdGEubGVuZ3RoKSB7XG4gICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG4gICAgICB0aGlzLm92ZXJsYXkgPSB0cnVlO1xuICAgICAgdGhpcy5maWx0ZXJMaXN0KCk7XG4gICAgICB0aGlzLm9wZW5lZC5lbWl0KCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlQ2xvc2UoKSB7XG4gICAgaWYgKCF0aGlzLmlzT3Blbikge1xuICAgICAgdGhpcy5pc0ZvY3VzZWQgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICB0aGlzLm92ZXJsYXkgPSBmYWxzZTtcbiAgICB0aGlzLmZpbHRlcmVkTGlzdCA9IFtdO1xuICAgIHRoaXMuc2VsZWN0ZWRJZHggPSAtMTtcbiAgICB0aGlzLm5vdEZvdW5kID0gZmFsc2U7XG4gICAgdGhpcy5pc0hpc3RvcnlMaXN0VmlzaWJsZSA9IGZhbHNlO1xuICAgIHRoaXMuaXNGb2N1c2VkID0gZmFsc2U7XG4gICAgdGhpcy5jbG9zZWQuZW1pdCgpO1xuICB9XG5cbiAgaGFuZGxlRm9jdXMoZSkge1xuICAgIHRoaXMuc2VhcmNoSW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIGlmICh0aGlzLmlzRm9jdXNlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmlucHV0Rm9jdXNlZC5lbWl0KGUpO1xuICAgIC8vIGlmIGRhdGEgZXhpc3RzIHRoZW4gb3BlblxuICAgIGlmICh0aGlzLmRhdGEgJiYgdGhpcy5kYXRhLmxlbmd0aCkge1xuICAgICAgdGhpcy5zZXRQYW5lbFN0YXRlKGV2ZW50KTtcbiAgICB9XG4gICAgdGhpcy5pc0ZvY3VzZWQgPSB0cnVlO1xuICB9XG5cbiAgc2Nyb2xsVG9FbmQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNTY3JvbGxUb0VuZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNjcm9sbFRvcCA9IHRoaXMuZmlsdGVyZWRMaXN0RWxlbWVudC5uYXRpdmVFbGVtZW50XG4gICAgICAuc2Nyb2xsVG9wO1xuICAgIGNvbnN0IHNjcm9sbEhlaWdodCA9IHRoaXMuZmlsdGVyZWRMaXN0RWxlbWVudC5uYXRpdmVFbGVtZW50XG4gICAgICAuc2Nyb2xsSGVpZ2h0O1xuICAgIGNvbnN0IGVsZW1lbnRIZWlnaHQgPSB0aGlzLmZpbHRlcmVkTGlzdEVsZW1lbnQubmF0aXZlRWxlbWVudFxuICAgICAgLmNsaWVudEhlaWdodDtcbiAgICBjb25zdCBhdEJvdHRvbSA9IHNjcm9sbEhlaWdodCA9PT0gc2Nyb2xsVG9wICsgZWxlbWVudEhlaWdodDtcbiAgICBpZiAoYXRCb3R0b20pIHtcbiAgICAgIHRoaXMuc2Nyb2xsZWRUb0VuZC5lbWl0KCk7XG4gICAgICB0aGlzLmlzU2Nyb2xsVG9FbmQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIGtleWJvYXJkIGV2ZW50c1xuICAgKi9cbiAgaW5pdEV2ZW50U3RyZWFtKCkge1xuICAgIHRoaXMuaW5wdXRLZXlVcCQgPSBmcm9tRXZlbnQoXG4gICAgICB0aGlzLnNlYXJjaElucHV0Lm5hdGl2ZUVsZW1lbnQsICdrZXl1cCdcbiAgICApLnBpcGUobWFwKFxuICAgICAgKGU6IGFueSkgPT4gZVxuICAgICkpO1xuXG4gICAgdGhpcy5pbnB1dEtleURvd24kID0gZnJvbUV2ZW50KFxuICAgICAgdGhpcy5zZWFyY2hJbnB1dC5uYXRpdmVFbGVtZW50LFxuICAgICAgJ2tleWRvd24nXG4gICAgKS5waXBlKG1hcChcbiAgICAgIChlOiBhbnkpID0+IGVcbiAgICApKTtcblxuICAgIHRoaXMubGlzdGVuRXZlbnRTdHJlYW0oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW4ga2V5Ym9hcmQgZXZlbnRzXG4gICAqL1xuICBsaXN0ZW5FdmVudFN0cmVhbSgpIHtcbiAgICAvLyBrZXkgdXAgZXZlbnRcbiAgICB0aGlzLmlucHV0S2V5VXAkXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKGUgPT5cbiAgICAgICAgICAhaXNBcnJvd1VwRG93bihlLmtleUNvZGUpICYmXG4gICAgICAgICAgIWlzRW50ZXIoZS5rZXlDb2RlKSAmJlxuICAgICAgICAgICFpc0VTQyhlLmtleUNvZGUpICYmXG4gICAgICAgICAgIWlzVGFiKGUua2V5Q29kZSkpLFxuICAgICAgICBkZWJvdW5jZVRpbWUodGhpcy5kZWJvdW5jZVRpbWUpXG4gICAgICApLnN1YnNjcmliZShlID0+IHtcbiAgICAgIHRoaXMub25LZXlVcChlKTtcbiAgICB9KTtcblxuICAgIC8vIGN1cnNvciB1cCAmIGRvd25cbiAgICB0aGlzLmlucHV0S2V5RG93biQucGlwZShmaWx0ZXIoXG4gICAgICBlID0+IGlzQXJyb3dVcERvd24oZS5rZXlDb2RlKVxuICAgICkpLnN1YnNjcmliZShlID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMub25Gb2N1c0l0ZW0oZSk7XG4gICAgfSk7XG5cbiAgICAvLyBlbnRlciBrZXl1cFxuICAgIHRoaXMuaW5wdXRLZXlVcCQucGlwZShmaWx0ZXIoZSA9PiBpc0VudGVyKGUua2V5Q29kZSkpKS5zdWJzY3JpYmUoZSA9PiB7XG4gICAgICAvL3RoaXMub25IYW5kbGVFbnRlcigpO1xuICAgIH0pO1xuXG4gICAgLy8gZW50ZXIga2V5ZG93blxuICAgIHRoaXMuaW5wdXRLZXlEb3duJC5waXBlKGZpbHRlcihlID0+IGlzRW50ZXIoZS5rZXlDb2RlKSkpLnN1YnNjcmliZShlID0+IHtcbiAgICAgIHRoaXMub25IYW5kbGVFbnRlcigpO1xuICAgIH0pO1xuXG4gICAgLy8gRVNDXG4gICAgdGhpcy5pbnB1dEtleVVwJC5waXBlKFxuICAgICAgZmlsdGVyKGUgPT4gaXNFU0MoZS5rZXlDb2RlKSxcbiAgICAgICAgZGVib3VuY2VUaW1lKDEwMCkpXG4gICAgKS5zdWJzY3JpYmUoZSA9PiB7XG4gICAgICB0aGlzLm9uRXNjKCk7XG4gICAgfSk7XG5cbiAgICAvLyBUQUJcbiAgICB0aGlzLmlucHV0S2V5RG93biQucGlwZShcbiAgICAgIGZpbHRlcihlID0+IGlzVGFiKGUua2V5Q29kZSkpXG4gICAgKS5zdWJzY3JpYmUoZSA9PiB7XG4gICAgICB0aGlzLm9uVGFiKCk7XG4gICAgfSk7XG5cbiAgICAvLyBkZWxldGVcbiAgICB0aGlzLmlucHV0S2V5RG93biQucGlwZShcbiAgICAgIGZpbHRlcihlID0+IGlzQmFja3NwYWNlKGUua2V5Q29kZSkgfHwgaXNEZWxldGUoZS5rZXlDb2RlKSlcbiAgICApLnN1YnNjcmliZShlID0+IHtcbiAgICAgIHRoaXMub25EZWxldGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBvbiBrZXl1cCA9PSB3aGVuIGlucHV0IGNoYW5nZWRcbiAgICogQHBhcmFtIGUgZXZlbnRcbiAgICovXG4gIG9uS2V5VXAoZSkge1xuICAgIHRoaXMubm90Rm91bmQgPSBmYWxzZTsgLy8gc2VhcmNoIHJlc3VsdHMgYXJlIHVua25vd24gd2hpbGUgdHlwaW5nXG4gICAgLy8gaWYgaW5wdXQgaXMgZW1wdHlcbiAgICBpZiAoIXRoaXMucXVlcnkpIHtcbiAgICAgIHRoaXMubm90Rm91bmQgPSBmYWxzZTtcbiAgICAgIHRoaXMuaW5wdXRDaGFuZ2VkLmVtaXQoZS50YXJnZXQudmFsdWUpO1xuICAgICAgdGhpcy5pbnB1dENsZWFyZWQuZW1pdCgpO1xuICAgICAgLy90aGlzLmZpbHRlckxpc3QoKTtcbiAgICAgIHRoaXMuc2V0UGFuZWxTdGF0ZShlKTtcbiAgICB9XG4gICAgLy8gbm90ZSB0aGF0ICcnIGNhbiBiZSBhIHZhbGlkIHF1ZXJ5XG4gICAgaWYgKCF0aGlzLnF1ZXJ5ICYmIHRoaXMucXVlcnkgIT09ICcnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIGlmIHF1ZXJ5ID49IHRvIG1pblF1ZXJ5TGVuZ3RoXG4gICAgaWYgKHRoaXMucXVlcnkubGVuZ3RoID49IHRoaXMubWluUXVlcnlMZW5ndGgpIHtcbiAgICAgIHRoaXMuaW5wdXRDaGFuZ2VkLmVtaXQoZS50YXJnZXQudmFsdWUpO1xuICAgICAgdGhpcy5maWx0ZXJMaXN0KCk7XG5cbiAgICAgIC8vIElmIG5vIHJlc3VsdHMgZm91bmRcbiAgICAgIGlmICghdGhpcy5maWx0ZXJlZExpc3QubGVuZ3RoICYmICF0aGlzLmlzTG9hZGluZykge1xuICAgICAgICB0aGlzLm5vdEZvdW5kVGV4dCA/IHRoaXMubm90Rm91bmQgPSB0cnVlIDogdGhpcy5ub3RGb3VuZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIEtleWJvYXJkIGFycm93IHRvcCBhbmQgYXJyb3cgYm90dG9tXG4gICAqIEBwYXJhbSBlIGV2ZW50XG4gICAqL1xuICBvbkZvY3VzSXRlbShlKSB7XG4gICAgLy8gbW92ZSBhcnJvdyB1cCBhbmQgZG93biBvbiBmaWx0ZXJlZExpc3Qgb3IgaGlzdG9yeUxpc3RcbiAgICBpZiAoIXRoaXMuaGlzdG9yeUxpc3QubGVuZ3RoIHx8ICF0aGlzLmlzSGlzdG9yeUxpc3RWaXNpYmxlKSB7XG4gICAgICAvLyBmaWx0ZXJlZExpc3RcbiAgICAgIGNvbnN0IHRvdGFsTnVtSXRlbSA9IHRoaXMuZmlsdGVyZWRMaXN0Lmxlbmd0aDtcbiAgICAgIGlmIChlLmtleSA9PT0gJ0Fycm93RG93bicpIHtcbiAgICAgICAgbGV0IHN1bSA9IHRoaXMuc2VsZWN0ZWRJZHg7XG4gICAgICAgIHN1bSA9ICh0aGlzLnNlbGVjdGVkSWR4ID09PSBudWxsKSA/IDAgOiBzdW0gKyAxO1xuICAgICAgICB0aGlzLnNlbGVjdGVkSWR4ID0gKHRvdGFsTnVtSXRlbSArIHN1bSkgJSB0b3RhbE51bUl0ZW07XG4gICAgICAgIHRoaXMuc2Nyb2xsVG9Gb2N1c2VkSXRlbSh0aGlzLnNlbGVjdGVkSWR4KTtcbiAgICAgIH0gZWxzZSBpZiAoZS5rZXkgPT09ICdBcnJvd1VwJykge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZElkeCA9PSAtMSkge1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJZHggPSAwO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJZHggPSAodG90YWxOdW1JdGVtICsgdGhpcy5zZWxlY3RlZElkeCAtIDEpICUgdG90YWxOdW1JdGVtO1xuICAgICAgICB0aGlzLnNjcm9sbFRvRm9jdXNlZEl0ZW0odGhpcy5zZWxlY3RlZElkeCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGhpc3RvcnlMaXN0XG4gICAgICBjb25zdCB0b3RhbE51bUl0ZW0gPSB0aGlzLmhpc3RvcnlMaXN0Lmxlbmd0aDtcbiAgICAgIGlmIChlLmtleSA9PT0gJ0Fycm93RG93bicpIHtcbiAgICAgICAgbGV0IHN1bSA9IHRoaXMuc2VsZWN0ZWRJZHg7XG4gICAgICAgIHN1bSA9ICh0aGlzLnNlbGVjdGVkSWR4ID09PSBudWxsKSA/IDAgOiBzdW0gKyAxO1xuICAgICAgICB0aGlzLnNlbGVjdGVkSWR4ID0gKHRvdGFsTnVtSXRlbSArIHN1bSkgJSB0b3RhbE51bUl0ZW07XG4gICAgICAgIHRoaXMuc2Nyb2xsVG9Gb2N1c2VkSXRlbSh0aGlzLnNlbGVjdGVkSWR4KTtcbiAgICAgIH0gZWxzZSBpZiAoZS5rZXkgPT09ICdBcnJvd1VwJykge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZElkeCA9PSAtMSkge1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJZHggPSAwO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJZHggPSAodG90YWxOdW1JdGVtICsgdGhpcy5zZWxlY3RlZElkeCAtIDEpICUgdG90YWxOdW1JdGVtO1xuICAgICAgICB0aGlzLnNjcm9sbFRvRm9jdXNlZEl0ZW0odGhpcy5zZWxlY3RlZElkeCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNjcm9sbCB0byBmb2N1c2VkIGl0ZW1cbiAgICogKiBAcGFyYW0gaW5kZXhcbiAgICovXG4gIHNjcm9sbFRvRm9jdXNlZEl0ZW0oaW5kZXgpIHtcbiAgICBsZXQgbGlzdEVsZW1lbnQgPSBudWxsO1xuICAgIC8vIERlZmluZSBsaXN0IGVsZW1lbnRcbiAgICBpZiAoIXRoaXMuaGlzdG9yeUxpc3QubGVuZ3RoIHx8ICF0aGlzLmlzSGlzdG9yeUxpc3RWaXNpYmxlKSB7XG4gICAgICAvLyBmaWx0ZXJlZExpc3QgZWxlbWVudFxuICAgICAgbGlzdEVsZW1lbnQgPSB0aGlzLmZpbHRlcmVkTGlzdEVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaGlzdG9yeUxpc3QgZWxlbWVudFxuICAgICAgbGlzdEVsZW1lbnQgPSB0aGlzLmhpc3RvcnlMaXN0RWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuICAgIGNvbnN0IGl0ZW1zID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobGlzdEVsZW1lbnQuY2hpbGROb2RlcykuZmlsdGVyKChub2RlOiBhbnkpID0+IHtcbiAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSAxKSB7XG4gICAgICAgIC8vIGlmIG5vZGUgaXMgZWxlbWVudFxuICAgICAgICByZXR1cm4gbm9kZS5jbGFzc05hbWUuaW5jbHVkZXMoJ2l0ZW0nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICghaXRlbXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbGlzdEhlaWdodCA9IGxpc3RFbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICBjb25zdCBpdGVtSGVpZ2h0ID0gaXRlbXNbaW5kZXhdLm9mZnNldEhlaWdodDtcbiAgICBjb25zdCB2aXNpYmxlVG9wID0gbGlzdEVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgIGNvbnN0IHZpc2libGVCb3R0b20gPSBsaXN0RWxlbWVudC5zY3JvbGxUb3AgKyBsaXN0SGVpZ2h0IC0gaXRlbUhlaWdodDtcbiAgICBjb25zdCB0YXJnZXRQb3NpdGlvbiA9IGl0ZW1zW2luZGV4XS5vZmZzZXRUb3A7XG5cbiAgICBpZiAodGFyZ2V0UG9zaXRpb24gPCB2aXNpYmxlVG9wKSB7XG4gICAgICBsaXN0RWxlbWVudC5zY3JvbGxUb3AgPSB0YXJnZXRQb3NpdGlvbjtcbiAgICB9XG5cbiAgICBpZiAodGFyZ2V0UG9zaXRpb24gPiB2aXNpYmxlQm90dG9tKSB7XG4gICAgICBsaXN0RWxlbWVudC5zY3JvbGxUb3AgPSB0YXJnZXRQb3NpdGlvbiAtIGxpc3RIZWlnaHQgKyBpdGVtSGVpZ2h0O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3QgaXRlbSBvbiBlbnRlciBjbGlja1xuICAgKi9cbiAgb25IYW5kbGVFbnRlcigpIHtcbiAgICAvLyBjbGljayBlbnRlciB0byBjaG9vc2UgaXRlbSBmcm9tIGZpbHRlcmVkTGlzdCBvciBoaXN0b3J5TGlzdFxuICAgIGlmICh0aGlzLnNlbGVjdGVkSWR4ID4gLTEpIHtcbiAgICAgIGlmICghdGhpcy5oaXN0b3J5TGlzdC5sZW5ndGggfHwgIXRoaXMuaXNIaXN0b3J5TGlzdFZpc2libGUpIHtcbiAgICAgICAgLy8gZmlsdGVyZWRMaXN0XG4gICAgICAgIHRoaXMucXVlcnkgPSAhdGhpcy5pc1R5cGUodGhpcy5maWx0ZXJlZExpc3RbdGhpcy5zZWxlY3RlZElkeF0pXG4gICAgICAgICAgPyB0aGlzLmZpbHRlcmVkTGlzdFt0aGlzLnNlbGVjdGVkSWR4XVt0aGlzLnNlYXJjaEtleXdvcmRdXG4gICAgICAgICAgOiB0aGlzLmZpbHRlcmVkTGlzdFt0aGlzLnNlbGVjdGVkSWR4XTtcblxuICAgICAgICB0aGlzLnNhdmVIaXN0b3J5KHRoaXMuZmlsdGVyZWRMaXN0W3RoaXMuc2VsZWN0ZWRJZHhdKTtcbiAgICAgICAgdGhpcy5zZWxlY3QodGhpcy5maWx0ZXJlZExpc3RbdGhpcy5zZWxlY3RlZElkeF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gaGlzdG9yeUxpc3RcbiAgICAgICAgdGhpcy5xdWVyeSA9ICF0aGlzLmlzVHlwZSh0aGlzLmhpc3RvcnlMaXN0W3RoaXMuc2VsZWN0ZWRJZHhdKVxuICAgICAgICAgID8gdGhpcy5oaXN0b3J5TGlzdFt0aGlzLnNlbGVjdGVkSWR4XVt0aGlzLnNlYXJjaEtleXdvcmRdXG4gICAgICAgICAgOiB0aGlzLmhpc3RvcnlMaXN0W3RoaXMuc2VsZWN0ZWRJZHhdO1xuICAgICAgICB0aGlzLnNhdmVIaXN0b3J5KHRoaXMuaGlzdG9yeUxpc3RbdGhpcy5zZWxlY3RlZElkeF0pO1xuICAgICAgICB0aGlzLnNlbGVjdCh0aGlzLmhpc3RvcnlMaXN0W3RoaXMuc2VsZWN0ZWRJZHhdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5pc0hpc3RvcnlMaXN0VmlzaWJsZSA9IGZhbHNlO1xuICAgIHRoaXMuaGFuZGxlQ2xvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFc2MgY2xpY2tcbiAgICovXG4gIG9uRXNjKCkge1xuICAgIHRoaXMuc2VhcmNoSW5wdXQubmF0aXZlRWxlbWVudC5ibHVyKCk7XG4gICAgdGhpcy5oYW5kbGVDbG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRhYiBjbGlja1xuICAgKi9cbiAgb25UYWIoKSB7XG4gICAgdGhpcy5zZWFyY2hJbnB1dC5uYXRpdmVFbGVtZW50LmJsdXIoKTtcbiAgICB0aGlzLmhhbmRsZUNsb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlIGNsaWNrXG4gICAqL1xuICBvbkRlbGV0ZSgpIHtcbiAgICAvLyBwYW5lbCBpcyBvcGVuIG9uIGRlbGV0ZVxuICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFNlbGVjdCBpdGVtIHRvIHNhdmUgaW4gbG9jYWxTdG9yYWdlXG4gICAqIEBwYXJhbSBzZWxlY3RlZFxuICAgKi9cbiAgc2F2ZUhpc3Rvcnkoc2VsZWN0ZWQpIHtcbiAgICBpZiAodGhpcy5oaXN0b3J5SWRlbnRpZmllcikge1xuICAgICAgLy8gY2hlY2sgaWYgc2VsZWN0ZWQgaXRlbSBleGlzdHMgaW4gaGlzdG9yeUxpc3RcbiAgICAgIGlmICghdGhpcy5oaXN0b3J5TGlzdC5zb21lKChpdGVtKSA9PiAhdGhpcy5pc1R5cGUoaXRlbSlcbiAgICAgICAgPyBpdGVtW3RoaXMuc2VhcmNoS2V5d29yZF0gPT0gc2VsZWN0ZWRbdGhpcy5zZWFyY2hLZXl3b3JkXSA6IGl0ZW0gPT0gc2VsZWN0ZWQpKSB7XG4gICAgICAgIHRoaXMuc2F2ZUhpc3RvcnlUb0xvY2FsU3RvcmFnZShbc2VsZWN0ZWQsIC4uLnRoaXMuaGlzdG9yeUxpc3RdKTtcblxuICAgICAgICAvLyBjaGVjayBpZiBpdGVtcyBkb24ndCBleGNlZWQgbWF4IGFsbG93ZWQgbnVtYmVyXG4gICAgICAgIGlmICh0aGlzLmhpc3RvcnlMaXN0Lmxlbmd0aCA+PSB0aGlzLmhpc3RvcnlMaXN0TWF4TnVtYmVyKSB7XG4gICAgICAgICAgdGhpcy5oaXN0b3J5TGlzdC5zcGxpY2UodGhpcy5oaXN0b3J5TGlzdC5sZW5ndGggLSAxLCAxKTtcbiAgICAgICAgICB0aGlzLnNhdmVIaXN0b3J5VG9Mb2NhbFN0b3JhZ2UoW3NlbGVjdGVkLCAuLi50aGlzLmhpc3RvcnlMaXN0XSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGlmIHNlbGVjdGVkIGl0ZW0gZXhpc3RzIGluIGhpc3RvcnlMaXN0IHN3YXAgdG8gdG9wIGluIGFycmF5XG4gICAgICAgIGlmICghdGhpcy5pc1R5cGUoc2VsZWN0ZWQpKSB7XG4gICAgICAgICAgLy8gb2JqZWN0IGxvZ2ljXG4gICAgICAgICAgY29uc3QgY29waWVkSGlzdG9yeUxpc3QgPSB0aGlzLmhpc3RvcnlMaXN0LnNsaWNlKCk7IC8vIGNvcHkgb3JpZ2luYWwgaGlzdG9yeUxpc3QgYXJyYXlcbiAgICAgICAgICBjb25zdCBzZWxlY3RlZEluZGV4ID0gY29waWVkSGlzdG9yeUxpc3QubWFwKChpdGVtKSA9PiBpdGVtW3RoaXMuc2VhcmNoS2V5d29yZF0pLmluZGV4T2Yoc2VsZWN0ZWRbdGhpcy5zZWFyY2hLZXl3b3JkXSk7XG4gICAgICAgICAgY29waWVkSGlzdG9yeUxpc3Quc3BsaWNlKHNlbGVjdGVkSW5kZXgsIDEpO1xuICAgICAgICAgIGNvcGllZEhpc3RvcnlMaXN0LnNwbGljZSgwLCAwLCBzZWxlY3RlZCk7XG4gICAgICAgICAgdGhpcy5zYXZlSGlzdG9yeVRvTG9jYWxTdG9yYWdlKFsuLi5jb3BpZWRIaXN0b3J5TGlzdF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIHN0cmluZyBsb2dpY1xuICAgICAgICAgIGNvbnN0IGNvcGllZEhpc3RvcnlMaXN0ID0gdGhpcy5oaXN0b3J5TGlzdC5zbGljZSgpOyAvLyBjb3B5IG9yaWdpbmFsIGhpc3RvcnlMaXN0IGFycmF5XG4gICAgICAgICAgY29waWVkSGlzdG9yeUxpc3Quc3BsaWNlKHRoaXMuaGlzdG9yeUxpc3QuaW5kZXhPZihzZWxlY3RlZCksIDEpO1xuICAgICAgICAgIGNvcGllZEhpc3RvcnlMaXN0LnNwbGljZSgwLCAwLCBzZWxlY3RlZCk7XG4gICAgICAgICAgdGhpcy5zYXZlSGlzdG9yeVRvTG9jYWxTdG9yYWdlKFsuLi5jb3BpZWRIaXN0b3J5TGlzdF0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNhdmUgaXRlbSBpbiBsb2NhbFN0b3JhZ2VcbiAgICogQHBhcmFtIHNlbGVjdGVkXG4gICAqL1xuICBzYXZlSGlzdG9yeVRvTG9jYWxTdG9yYWdlKHNlbGVjdGVkKSB7XG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKFxuICAgICAgYCR7dGhpcy5oaXN0b3J5SWRlbnRpZmllcn1gLFxuICAgICAgSlNPTi5zdHJpbmdpZnkoc2VsZWN0ZWQpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgaXRlbSBmcm9tIGxvY2FsU3RvcmFnZVxuICAgKiBAcGFyYW0gaW5kZXhcbiAgICogQHBhcmFtIGUgZXZlbnRcbiAgICovXG4gIHJlbW92ZUhpc3RvcnlJdGVtKGluZGV4LCBlKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLmhpc3RvcnlMaXN0ID0gdGhpcy5oaXN0b3J5TGlzdC5maWx0ZXIoKHYsIGkpID0+IGkgIT09IGluZGV4KTtcbiAgICB0aGlzLnNhdmVIaXN0b3J5VG9Mb2NhbFN0b3JhZ2UodGhpcy5oaXN0b3J5TGlzdCk7XG4gICAgaWYgKHRoaXMuaGlzdG9yeUxpc3QubGVuZ3RoID09IDApIHtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShgJHt0aGlzLmhpc3RvcnlJZGVudGlmaWVyfWApO1xuICAgICAgdGhpcy5maWx0ZXJMaXN0KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IGxvY2FsU3RvcmFnZVxuICAgKiBAcGFyYW0gZSBldmVudFxuICAgKi9cbiAgcmVzZXRIaXN0b3J5TGlzdChlKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLmhpc3RvcnlMaXN0ID0gW107XG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGAke3RoaXMuaGlzdG9yeUlkZW50aWZpZXJ9YCk7XG4gICAgdGhpcy5maWx0ZXJMaXN0KCk7XG4gIH1cbn1cbiJdfQ==