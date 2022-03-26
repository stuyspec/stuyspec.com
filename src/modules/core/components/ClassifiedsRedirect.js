import React from 'react';

export function ClassifiedsRedirect() {
  window.location = 'https://goo.gl/forms/bltSaUMOwVW5TpN02';
  return (
    <p>
      If you're not automatically redirected, please
      {' '}
      <a href="https://goo.gl/forms/bltSaUMOwVW5TpN02">click here.</a>
    </p>
  );
}
