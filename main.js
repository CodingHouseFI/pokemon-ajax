'use strict';

$(document).ready(init);

function init() {
  getPokedex();
  $('.pokelist').on('dblclick', 'li', selectPokemon);
}

function selectPokemon() {
  let url = $(this).data('url');
  $('.pokedata h1').text('...loading');
  $('.data').hide();
  
  $.ajax(url)
    .done(function(data) {
      console.log('data:', data);

      $('.name').text(data.name);
      $('.id').text(data.id);
      $('.color').text(data.color.name);
      $('.habitat').text(data.habitat.name);
      $('.image').attr('src', `http://pokeapi.co/media/sprites/pokemon/${data.id}.png`);

      $('.data').show();

    })
    .fail(function() {
      console.log('error!');
    })
    .always(function() {
      $('.pokedata h1').text('POKEDATA');
    });
}



function getPokedex() {
  $.ajax('http://pokeapi.co/api/v2/pokedex/1')
    .done(function(data) {
      let $lis = createPokemonList(data.pokemon_entries);
      $('.pokelist').append($lis);
    })
    .fail(function() {
      console.log('error!');
    });
}

function createPokemonList(allPokemon) {
  return allPokemon.map(pokemon => {
    let $li = $('<li>');
    $li.text(pokemon.pokemon_species.name);
    $li.data('url', pokemon.pokemon_species.url);
    return $li;
  });
}



