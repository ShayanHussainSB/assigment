use anchor_lang::prelude::*;

// #[account]
// pub struct InputOne {
//     pub key: Pubkey,
//     pub number: i64,
// }

// impl InputOne {
//     pub const LEN: usize = 8 + 40;
//     pub fn set_defaults(&mut self) {
//         self.key = Pubkey::default();
//         self.number = 0;
//     }
// }

// #[account]
// pub struct InputTwo {
//     pub key: Pubkey,
//     pub number: i64,
// }
// impl InputTwo {
//     pub const LEN: usize = 8 + 40;
//     pub fn set_defaults(&mut self) {
//         self.key = Pubkey::default();
//         self.number = 0;
//     }
// }

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug, PartialEq, Copy)]
pub enum Operations {
    Add,
    Sub,
    Mul,
    Div,
}

// #[account]
// pub struct Operator {
//     pub key: Pubkey,
//     pub sign: Operations,
// }
// impl Operator {
//     pub const LEN: usize = 8 + 33;
//     pub fn set_defaults(&mut self) {
//         self.key = Pubkey::default();
//         self.sign = Operations::Add;
//     }
// }

// #[account]
// pub struct Output {
//     pub key: Pubkey,
//     pub number: i64,
// }
// impl Output {
//     pub const LEN: usize = 8 + 40;

//     pub fn set_defaults(&mut self) {
//         self.key = Pubkey::default();
//         self.number = 0;
//     }
// }

#[account]
pub struct InOut {
    pub key: Pubkey,
    pub input_one: i64,
    pub input_two: i64,
    pub operator: Operations,
    pub output: i64,
}
impl InOut {
    pub const LEN: usize = 8 + 64;
    pub fn set_defaults(&mut self) {
        self.key = Pubkey::default();
        self.input_one = 0;
        self.input_two = 0;
        self.operator = Operations::Add;
        self.output = 0;
    }
}
