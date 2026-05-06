function initTocCollapse() {
  const tocRoot = document.querySelector(".md-sidebar [data-md-component='toc']");
  if (!tocRoot) {
    return;
  }

  const items = tocRoot.querySelectorAll("li.md-nav__item");

  for (const item of items) {
    const childNav = item.querySelector(":scope > nav.md-nav");
    const link = item.querySelector(":scope > .md-nav__link");

    if (!childNav || !link) {
      continue;
    }

    item.classList.add("md-nav__item--collapsible");

    let toggle = item.querySelector(":scope > .toc-collapse-toggle");
    if (!toggle) {
      toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "toc-collapse-toggle";
      toggle.setAttribute("aria-label", "Свернуть или развернуть подраздел");
      item.insertBefore(toggle, link);
    }

    const hasActiveChild = !!item.querySelector(".md-nav__link--active, .md-nav__item--active");
    const shouldExpand = hasActiveChild;

    if (!item.dataset.tocCollapseReady) {
      item.classList.toggle("md-nav__item--collapsed", !shouldExpand);
      item.dataset.tocCollapseReady = "true";
    }

    toggle.setAttribute(
      "aria-expanded",
      String(!item.classList.contains("md-nav__item--collapsed"))
    );

    toggle.onclick = () => {
      item.classList.toggle("md-nav__item--collapsed");
      toggle.setAttribute(
        "aria-expanded",
        String(!item.classList.contains("md-nav__item--collapsed"))
      );
    };
  }
}

document.addEventListener("DOMContentLoaded", initTocCollapse);

if (typeof window.document$ !== "undefined") {
  window.document$.subscribe(() => {
    initTocCollapse();
  });
}
