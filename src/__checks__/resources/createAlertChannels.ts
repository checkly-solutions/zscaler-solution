/* Explainer:
Reference existing alert channels from within Checkly account.
If these are deleted or removed they will cause a failure to deploy, etc.

https://www.checklyhq.com/docs/cli/constructs-reference/#using-fromid-to-reference-an-existing-channel
*/
import { PagerdutyAlertChannel, SlackAlertChannel } from 'checkly/constructs'

export const pagerdutyChannel = PagerdutyAlertChannel.fromId('255654')
export const slackChannel = SlackAlertChannel.fromId('255653')
