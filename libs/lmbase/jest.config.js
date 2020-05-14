module.exports = {
  name: 'lmbase',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/lmbase',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
