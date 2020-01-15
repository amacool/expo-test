
function checkStaus(response) {
  console.log('responseErrorCallback===========:', response);
  let error;
  if (response.status < 200 || response.status >= 300) {
    error = new Error(response.statusText);
  } else if (response.status !== 200) {
    error = new Error('Response is not JSON');
  } else if (response.status === 403) {
    response.statusText = 'Something went wrong, Please try again.';
    error = new Error(response.statusText);
  }
  if (error) {
    error.response = response;
    throw error;
  }
  return response;
}

async function parseJSON(response) {
  if (response.status === 204) {
    return undefined;
  }
  try {
    return await response.json();
  } catch (e) {
    return response;
  }
}

function responseErrorCallback(error) {
  console.log('responseErrorCallback:', error);
}

const get = (url, giftCode) => {
  console.log(`http://68.183.137.59:10000/${url}`, giftCode);
  return fetch(`http://68.183.137.59:10000/${url}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'x-api-key': 'testtoken123',
      'x-api-promo': giftCode,
      'Content-Type': 'application/json'
    },
  })
    .then(checkStaus, responseErrorCallback)
};

export {
  get
}
