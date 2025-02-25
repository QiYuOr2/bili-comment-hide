interface Content {
  message: string
}

interface Member {
  mid: bigint
  uname: string
  mid_str: string
}

export interface Reply {
  rpid: bigint
  oid: bigint
  mid: bigint
  mid_str: string
  oid_str: string
  rpid_str: string
  type: number
  member: Member
  content: Content
}


