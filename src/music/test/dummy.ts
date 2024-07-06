export const AudioReleaseDto = {
  user: {},
  title: '',
  artist: '',
  primaryGenre: '',
  secondaryGenre: '',
  language: '',
  releaseDate: '',
  label: '',
  copyrightHolder: '',
  copyrightYear: '',
  productionHolder: '',
  productionYear: '',
  releaseCover: '',
  releaseAudio: '',
  releaseAudioLink: '',
  lyrics: '',
  imageFileName: '',
  audioFileName: '',
};

export const VideoReleaseDto = {
  title: '',
  link: '',
  description: '',
  keywords: '',
  releaseDate: '',
};

export const user = {
  id: '1',
  name: 'John Doe',
  email: 'test@test.com',
  hash: '',
  email_verified: true,
  hashedRefreshToken: '',
  emailVerificationToken: '',
  emailVerificationTokenExpiration: new Date(),
  role: '',
};

export const userReleases = [
  { AudioReleaseDto: AudioReleaseDto },
  { VideoReleaseDto: VideoReleaseDto },
];
