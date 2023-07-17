class NetsisHelper {
  static Trk(val) {
    let TMP = val
      .replace(/\u00D0/g, 'Ğ')
      .replace(/\u00DC/g, 'Ü')
      .replace(/\u00DE/g, 'Ş')
      .replace(/\u00DD/g, 'İ')
      .replace(/\u00D6/g, 'Ö')
      .replace(/\u00C7/g, 'Ç')
      .replace(/\u0049/g, 'I')
      .replace(/\u00F0/g, 'ğ')
      .replace(/\u00FC/g, 'ü')
      .replace(/\u00FE/g, 'ş')
      .replace(/\u0069/g, 'i')
      .replace(/\u00F6/g, 'ö')
      .replace(/\u00E7/g, 'ç')
      .replace(/\u00FD/g, 'ı')

    return TMP
  }
}

export default NetsisHelper
