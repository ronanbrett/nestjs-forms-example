module.exports = {
  name: 'forms',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/forms',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
