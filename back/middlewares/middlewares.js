const createId = (req, res, next) => {
  const id = 'item-' + Math.floor(Math.random() * 10000);
  req.body = Object.assign({ id }, req.body);
  next();
};

const validateNewItem = (req, res, next) => {
  const keys = Object.getOwnPropertyNames(req.body);

  keys.forEach(key => {
    if (!req.body[key]) {
      return res.status(400).json({
        status: "failed",
        data: "please inform all required keys",
      })
    }
  });
  next();
};

const validateKeys = ((req, res, next) => {
  const body = req.body;
  const itemKeys = ['nome', 'tamanho', 'preco', 'cor', 'categoria', 'imagem']
  for (const key in body) {
    if (!itemKeys.includes(key)) {
      return res.status(400).json({
        status: 'failed',
        message: 'inform only valid keys'
      })
    }
  }
  next()
});

const verifyMethod = (req, res, next) => {
  const methods = ['GET', 'POST', 'PATCH', 'DELETE'];

  if (!methods.includes(req.method)) {
    return res.status(405).json({
      status: 'Failed',
      data: `This method is not supported please try one of the follows: ${methods}`
    });
  }
  next();
};

module.exports = {
    createId,
    validateNewItem,
    validateKeys,
    verifyMethod
}