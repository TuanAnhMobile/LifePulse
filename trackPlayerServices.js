import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RepeatMode,
  Event,
} from 'react-native-track-player';

export async function setupPlayer() {
  let isSetup = false;
  try {
    await TrackPlayer.getCurrentTrack();
    isSetup = true;
  } catch {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
      ],
      progressUpdateEventInterval: 2,
    });
    isSetup = true;
  } finally {
    return isSetup;
  }
}

export async function addTracks() {
  await TrackPlayer.add([
    {
      id: '1',
      url: 'https://a128-z3.zmdcdn.me/df6209f36ebabfe13893dce7ffd4deb0?authen=exp=1723048472~acl=/df6209f36ebabfe13893dce7ffd4deb0/*~hmac=a11684718b184d013b9a378a276ca2e1',
      title: 'Vết Mưa Piano',
      artist: 'Vữ cát tường',
      artwork:
        'https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/covers/f/c/fc2a6e7c36cda413dae3f9477a2aa95a_1419349898.jpg',
    },
    {
      id: '2',
      url: 'https://a128-z3.zmdcdn.me/76d469e469431f62e3a6d7fc2ff27f99?authen=exp=1723048277~acl=/76d469e469431f62e3a6d7fc2ff27f99/*~hmac=c156751b840899b891f7944808598e32',
      title: 'Yên Bình Có Quá Đắt Không',
      artist: 'Khiem',
      artwork:
        'https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/e/a/b/b/eabb2337a1df645e56b586d6cffc29d5.jpg',
    },
    {
      id: '3',
      url: 'https://a128-z3.zmdcdn.me/bd690ffac6989d613740d68b4221f873?authen=exp=1723048602~acl=/bd690ffac6989d613740d68b4221f873/*~hmac=d1039fea245693c817db1a6a6c79d812',
      title: 'Từng Quen',
      artist: 'Wren Evans',
      artwork:
        'https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/9/7/4/c/974c4f42b6143c56af330323d86a0b7f.jpg',
    },
    {
      id: '4',
      url: 'https://a128-z3.zmdcdn.me/4849fd84fc54e2d7118869b01f282b93?authen=exp=1723048536~acl=/4849fd84fc54e2d7118869b01f282b93/*~hmac=af6a33d753880cc620df5790b8d180ac',
      title: 'Đưa Em Về Nhà',
      artist: 'GREY D',
      artwork:
        'https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_jpeg/cover/4/e/f/c/4efc45625390dc2019ae941edb572b00.jpg',
    },
    {
      id: '5',
      url: 'https://a128-z3.zmdcdn.me/a4b71594c6fbb79d092b99381bbc9230?authen=exp=1723048687~acl=/a4b71594c6fbb79d092b99381bbc9230/*~hmac=effc35d88e4bd841b379040920cb0a3d',
      title: 'Yêu Từ Đâu Mà Ra',
      artist: 'Li Zpoet',
      artwork:
        'https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/1/1/a/6/11a6395562d2eb6e9500d079f8975f32.jpg',
    },
    {
      id: '6',
      url: 'https://a128-z3.zmdcdn.me/25530103b6eac8788450527ee37abf57?authen=exp=1723048264~acl=/25530103b6eac8788450527ee37abf57/*~hmac=7ff472c62dcc78d577289fc2fe7f4c92',
      title: 'Bánh Mì Không',
      artist: 'Đạt G',
      artwork:
        'https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/2/9/0/6/2906681d4b764cd4677342b66813f25d.jpg',
    },
    {
      id: '7',
      url: 'https://a128-z3.zmdcdn.me/945f3ce83dd0eb820aa0e05cce267c5b?authen=exp=1723048623~acl=/945f3ce83dd0eb820aa0e05cce267c5b/*~hmac=6479b438ac76a4e01ace51752f36bc68',
      title: 'Thủy Triều',
      artist: 'Quang Hùng',
      artwork:
        'https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/8/4/7/4/8474eb9fd1a3aa78b974b4c104ff45fc.jpg',
    },
    {
      id: '8',
      url: 'https://a128-z3.zmdcdn.me/350d55e66574dd01f538bfbdf2592457?authen=exp=1723048592~acl=/350d55e66574dd01f538bfbdf2592457/*~hmac=b2cf11d53cb340dd3efed07c52cad8d5',
      title: 'Cẩm Tú Cầu',
      artist: 'Ray.O',
      artwork:
        'https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/6/5/c/5/65c525a2b1cb1afa037a19fa35048eca.jpg',
    },
    {
      id: '9',
      url: 'https://a128-z3.zmdcdn.me/759917ed7b67e5e26765e89f46f5cc41?authen=exp=1723048829~acl=/759917ed7b67e5e26765e89f46f5cc41/*~hmac=7fd78536ea814a6147310feac5143fcb',
      title: 'Chịu Cách Mình Nói Thua',
      artist: 'Rai đơ',
      artwork:
        'https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/e/3/d/5/e3d541870421859d108f5f982642bd36.jpg',
    },
    {
      id: '10',
      url: 'https://a128-z3.zmdcdn.me/a3840e9bba29ac36e6a1c793b345d1e7?authen=exp=1723048889~acl=/a3840e9bba29ac36e6a1c793b345d1e7/*~hmac=98f6c6cba1f8276b734edc58b3c08a92',
      title: 'Dân Chơi Thì Sao Phải Khóc',
      artist: 'ANH BÂUS',
      artwork:
        'https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/7/1/b/9/71b955cff065c904f0955d93a2925a83.jpg',
    },
  ]);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}

export async function playbackService() {
  // Các sự kiện điều khiển từ notification
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    TrackPlayer.pause();
  });
  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    TrackPlayer.play();
  });
  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    TrackPlayer.skipToNext();
  });
  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    TrackPlayer.skipToPrevious();
  });
}
