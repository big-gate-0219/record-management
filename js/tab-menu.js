{
    'use strict';

    const TAG_NAME_UL = 'ul';
    const TAG_NAME_LI = 'li';
    const TAG_NAME_SPAN = 'span';

    const CLASS_NAME_TAB_MENU = 'tab-menu';
    const CLASS_NAME_TAB_MENU_ITEM = 'tab-menu-item';
    const CLASS_NAME_TAB_CONTENT = 'tab-content';

    const tabMenuPrefix = 'tab-';

    function createTabMenuItem(content) {
        const span = document.createElement(TAG_NAME_SPAN);
        span.classList.add(CLASS_NAME_TAB_MENU_ITEM);
        span.textContent = content.dataset.title;
        span.id = tabMenuPrefix + content.id;
        span.dataset.for = content.id;
        if (content.classList.contains('active')) {
            span.classList.add('active');
        }
        return span
    }

    function wrapWithLiElement(element) {
        const li = document.createElement(TAG_NAME_LI);
        li.appendChild(element);
        return li;
    }

    function createTabMenuItemList(contents) {
        const ul = document.createElement(TAG_NAME_UL);
        for (let i = 0; i < contents.length; i++) {
            const content = contents.item(i);
            const span = createTabMenuItem(content);
            const li = wrapWithLiElement(span);
            ul.appendChild(li);
        }
        return ul;
    }

    function registerEvent(menuList) {
        const spans = menuList.getElementsByClassName(CLASS_NAME_TAB_MENU_ITEM);

        for (let i = 0; i < spans.length; i++) {
            const span = spans[i];
            span.addEventListener('click', () => {
                // メニューやコンテンツの非活性化
                for (let j = 0; j < spans.length; j++) {
                    spans[j].classList.remove('active');
                    document.getElementById(spans[j].dataset.for).classList.remove('active');
                }
                span.classList.add('active');
                document.getElementById(span.dataset.for).classList.add('active');
            });
        }
    }

    function createTabMenu(menus) {
        for (let i = 0; i < menus.length; i++) {
            const menu = menus.item(i);
            const contents = menu.getElementsByClassName(CLASS_NAME_TAB_CONTENT);
            const menuList = createTabMenuItemList(contents);
            menu.insertBefore(menuList, menu.firstChild);
            registerEvent(menuList);
        }
    }

    const menus = document.getElementsByClassName(CLASS_NAME_TAB_MENU);
    createTabMenu(menus);
}