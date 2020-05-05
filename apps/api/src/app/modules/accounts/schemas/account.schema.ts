import { Schema } from 'mongoose';

export const AccountSchema = new Schema({
  accountName: {
    type: String,
    unique: false,
    required: true
  },
  sourceAccountId: {
    type: String,
    unique: false,
    required: true
  },
  accountCreatedDate: Date,
  accountType: {
    type: String,
    required: true
  },
  privateMarket: Boolean,
  privateMarketSubType: {
    type: String,
    required: function() {
      return this.privateMarket === true;
    }
  }
});

AccountSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

AccountSchema.set('toJSON', {
  virtuals: true
});
