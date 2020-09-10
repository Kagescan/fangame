/* $ _layered v0.2.01. Part of the Retaining's Memories game (https://kagescan.legtux.org/fangame/).
 *
 * FEEL FREE TO USE, FORK AND EDIT THAT CUSTOM ACTION, as long as the comment
 * below stays here :
 *
 * The MIT License (MIT)
 * Copyright (c) 2017, 2020 ShinProg / Kagescan
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
*/

// CODE ------------------------------------------------------------------------


if (! CSS.supports("( -webkit-box-reflect:unset )")){
  // Checks for webkit only browser.
  // !! remove this code when firefox supports transitions for background-images
  //    like webkit based browsers already does.
  console.warn(
    "%c (IMPORTANT)", "color: black; font-weight: bold;",
    "_Layered warn : the perfect crossfading feature still don't work on",
    "browsers that are not based on webkit ! Original crossfades with fadeIn",
    "end-fadeOut classes are not even not supported.",
  );
}


monogatari.$ ('_layered', async function(character, ...arguments) {
  // TODO: Add default transitions for firefox !

  // var init
  const character_object = monogatari.character(character);
  if (typeof character_object !== "object") {
    throw `_Layered Error : character ${character} is not defined !`;
  }
  const character_sprites = character_object["sprites"];
  const character_internal = character_object["$_layered"];
  if (typeof character_internal !== "object" || typeof character_sprites !== "object") {
    throw `_Layered Error : character ${character} don't have valid [sprites] or`
                          + `[$_layered] child objects (or they don't exists.)!`;
  }
  if (! Array.isArray(character_internal["_history"])) {
    character_internal["_history"] = [];
  }
  const sprite_ref_to_url = function(reference) {
    // assumes that [reference] is valid !! Same with [directory] in chara object.
    const img_file = character_object.sprites[reference];
    const chara_dir = character_object.directory;
    return `assets/characters/${chara_dir}/${img_file}`;
  };
  // https://stackoverflow.com/a/10262019
  const is_empty = (string) => (! string.replace(/\s/g, '').length);

  // Getting classes and max nbr of layers.
  let classes = "";
  let max_nbr_of_layers = arguments.length;
  for (let i = 0; i < arguments.length; i++) {
    if (i >= max_nbr_of_layers) {
      classes += arguments[i] + " ";
    }
    if (arguments[i] == "with") {
        max_nbr_of_layers = i;
    } else if (is_empty(arguments[i])) {
      console.warn(`_Layered Warn : Argument ${i+1} is empty. This might cause unexpected behaviors from the custom action !`);
    }
  }

  // checking if this is the first time the character appears in the scene
  if (document.querySelector(`img[data-character="${character}"]`) === null) {
    const defaultSprite = character_internal["default"];
    if (   typeof defaultSprite !== "string"
        || typeof character_object.sprites[defaultSprite] !== "string") {
      throw `_Layered Error : default sprite for character ${character} is undefined or not valid`;
    }
    await monogatari.run(`show character ${character} ${defaultSprite} ${classes}`);
  }

  // checking if the code in the "if" just above worked
  const image = document.querySelector(`img[data-character="${character}"]`);
  if (image === null) {
    throw `_Layered Error : unable to get the image element of the [${character}] character`;
  }
  // Checking if the image element displays the default or an empty image.
  if (! image.src.includes("data:image")) {
    await new Promise( function(resolve, reject) {
      let stillWaiting = true;
      image.addEventListener("load", () => { stillWaiting = false; resolve() });
      setTimeout( () => {
        if (stillWaiting)
          reject(`_Layered Error : Image loading timeout for character [${character}]`);
      }, 1000);
    });
    if (   typeof image.naturalHeight !== "number"
        || typeof image.naturalWidth  !== "number") {
      throw `_Layered Error : cannot get natural height or natural width of the [${character}] image`;
    }
    if (image.naturalHeight <=0 || image.naturalWidth <=0) {
      throw `_Layered Error : default image for character [${character}] is not valid (or should have a size greater than 0)`;
    }
    image.src =`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'
    height='${image.naturalHeight}' width='${image.naturalWidth}'%3E%3C/svg%3E`;
  }
  //
  let generatedBackgroundImage = "";

  for (let i = 0; i < max_nbr_of_layers; i++) {
    const reference = arguments[i];
    let urlToAdd = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='${image.naturalHeight}' width='${image.naturalWidth}'%3E%3C/svg%3E`;

    // internal function to get/set the last reference :
    const last_ref_of_this_layer = function(setter) {
      const last_ref = character_internal["_history"][i];
      // getter
      if (typeof setter === "undefined") {
        if ( typeof last_ref === "string"
          && typeof character_object.sprites[last_ref] === "string") {
          return last_ref;
        } else {
          throw `_Layered Warning : while trying to get the last reference of layer ${i}, the value obtained is not defined or not valid.`;
        }
      }
      // setter
      if (typeof character_object.sprites[setter] !== "string") {
        // If you can get this error, congrats ! You're a champion !
        throw `_Layered Warning : while trying to set the last reference of layer ${i}, the value obtained (${setter}) is not valid. Setting aborted.`;
      }
      character_internal["_history"][i] = setter;
    }

    // stuff
    if (typeof character_object.sprites[reference] !== "string") {
      try {
        if (typeof reference !== "string" || is_empty(reference)) {
          throw `_Layered Warning : argument ${i} is an empty reference ! Prefers set the reference to "-" or "empty" instead of nothing.\n`
                + `Or maybe you inserted an extra space. Make sure to separate each arguments with one and only one space ! \n`;
        }
        if (reference === "-") {
           const last_ref = last_ref_of_this_layer();
           urlToAdd = sprite_ref_to_url(last_ref);
        } else if (reference !== "empty") {
          throw `_Layered Warning : the reference of sprite image [${reference}] isn't defined or not valid !  \n`;
        } // else keep that layer empty
      } catch (e) {
        console.warn(e, `_Layered will display the layer ${i} transparent.`);
      }
    } else {
      urlToAdd = sprite_ref_to_url(reference);
      last_ref_of_this_layer(reference);
    }

    // above : fallback image
    if (generatedBackgroundImage !== "") {
      generatedBackgroundImage += ",";
    }
    generatedBackgroundImage += `url("${urlToAdd}")`;
  }
  image.style.transition = "background-image 0.5s linear";
  image.style.backgroundPosition = "center top";
  image.style.backgroundRepeat = "no-repeat";
  image.style.backgroundSize = "contain";
  if (generatedBackgroundImage.includes("url")) {
    image.style.backgroundImage = generatedBackgroundImage;
  } else {
    console.error("generated background image don't have valid values : ", generatedBackgroundImage);
  }
  return "next";
});
