module.exports = {
  name: 'lmbase-batched-ops',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/lmbase-batched-ops',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
