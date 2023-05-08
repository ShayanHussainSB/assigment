use anchor_lang::prelude::*;

pub mod error;
pub mod instructions;
pub mod states;

use instructions::*;

declare_id!("HFKLK8ZBCDA8xp4YCsxyshaQQXwM8DQijmkhP3e3Jf7E");

#[program]
pub mod assigment {
    use super::*;

    pub fn inout(ctx: Context<InOutContext>, args: InOutArgs) -> Result<()> {
        instructions::inout(ctx, args)
    }

    pub fn clear_history(ctx: Context<ClearHistoryContext>) -> Result<()> {
        instructions::clear_history(ctx)
    }
}
