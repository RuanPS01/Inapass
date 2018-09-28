('table').on('click', 'tr.parent .fa-chevron-down', function(){
  $(this).closest('tbody').toggleClass('open');
});
