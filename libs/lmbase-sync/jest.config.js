module.exports = {
  name: 'lmbase-sync',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/lmbase-sync',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
