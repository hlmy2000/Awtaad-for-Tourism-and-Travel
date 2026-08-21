const filterButtons = document.querySelectorAll('.filter-btn');
const tourItems = document.querySelectorAll('.tour-item');
const searchInput = document.getElementById('tourSearchInput');

if (filterButtons.length > 0 && tourItems.length > 0) {
    function filterAndSearchTours() {
        const activeFilter = document.querySelector('.filter-btn.active-filter')?.getAttribute('data-filter') || 'all';
        const searchText = searchInput ? searchInput.value.toLowerCase().trim() : '';

        tourItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            const itemTags = (item.getAttribute('data-tags') || '').toLowerCase();
            const itemTitle = item.querySelector('.card-title')?.innerText.toLowerCase() || '';

            const matchesFilter = activeFilter === 'all' || itemCategory === activeFilter;
            const matchesSearch = searchText === '' || itemTags.includes(searchText) || itemTitle.includes(searchText);

            item.classList.toggle('hide-item', !(matchesFilter && matchesSearch));
        });
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterButtons.forEach(b => b.classList.remove('active-filter'));
            e.currentTarget.classList.add('active-filter');
            filterAndSearchTours();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', filterAndSearchTours);
    }
}
