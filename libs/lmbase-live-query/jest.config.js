module.exports = {
  name: 'lmbase-store',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/lmbase-store',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
