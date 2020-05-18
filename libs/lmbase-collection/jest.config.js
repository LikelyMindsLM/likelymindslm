module.exports = {
  name: 'lmbase-collection',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/lmbase-collection',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
