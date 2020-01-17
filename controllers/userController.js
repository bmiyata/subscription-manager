const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError('No User found!', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

exports.getUserSubscriptions = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError('No User found!', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      subscriptions: user.subscriptions
    }
  });
};

exports.addSubscription = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(
    req.body,
    'nameOfService',
    'amount',
    'dueDate',
    'monthly'
  );
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { $push: { subscriptions: filteredBody } },
    {
      new: true,
      runValidators: true
    }
  );

  if (!updatedUser) {
    return new AppError('No User found', 404);
  }
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

exports.deleteSubscription = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(req.user.id, {
    $pull: { subscriptions: { _id: req.params.id } }
  });

  if (!updatedUser) {
    return new AppError('No User found', 404);
  }

  res.status(204).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

exports.updateSubscription = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findOneAndUpdate(
    {
      _id: req.user.id,
      subscriptions: { $elemMatch: { _id: req.params.id } }
    },
    {
      $set: {
        'subscriptions.$.nameOfService': req.body.nameOfService,
        'subscriptions.$.amount': req.body.amount,
        'subscriptions.$.monthly': req.body.monthly,
        'subscriptions.$.dueDate': req.body.dueDate
      }
    },
    { new: true, runValidators: true }
  );

  if (!updatedUser) {
    return next(new AppError('No user found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});
