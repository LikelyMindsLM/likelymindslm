module.exports = {
  name: 'demo-client-app',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/demo-client-app',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
