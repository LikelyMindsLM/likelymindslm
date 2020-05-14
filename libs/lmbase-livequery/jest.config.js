module.exports = {
  name: 'lmbase-livequery',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/lmbase-livequery',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
