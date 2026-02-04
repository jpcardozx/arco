// Test Data Generator - Create Sample Checklist
// File: /scripts/create-sample-checklist.ts

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY! || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function createSampleChecklist() {
  try {
    console.log('🚀 Creating sample checklist with test user...')

    // First, get or create a test user
    const { data: users, error: usersError } = await supabase.auth.admin.listUsers()
    
    if (usersError) {
      console.error('Error fetching users:', usersError)
      return
    }

    let userId: string
    
    if (users.users.length === 0) {
      // Create a test user
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        email: 'test@arco.dev',
        password: 'test123456',
        email_confirm: true
      })
      
      if (createError || !newUser.user) {
        console.error('Error creating test user:', createError)
        return
      }
      
      userId = newUser.user.id
      console.log('✅ Created test user:', newUser.user.email)
    } else {
      userId = users.users[0].id
      console.log('✅ Using existing user:', users.users[0].email)
    }

    // Create a sample checklist using the database function
    const { data: checklistId, error: checklistError } = await supabase
      .rpc('create_website_audit_checklist', {
        p_user_id: userId,
        p_title: 'Auditoria Completa de Website - Demo',
        p_description: 'Checklist completo para auditoria de performance, SEO, segurança e UX do seu website'
      })

    if (checklistError || !checklistId) {
      console.error('Error creating checklist:', checklistError)
      return
    }

    console.log('✅ Created checklist with ID:', checklistId)

    // Get the created checklist with its items
    const { data: checklist, error: fetchError } = await supabase
      .from('interactive_checklists')
      .select(`
        *,
        checklist_items (*)
      `)
      .eq('id', checklistId)
      .single()

    if (fetchError || !checklist) {
      console.error('Error fetching created checklist:', fetchError)
      return
    }

    console.log(`✅ Checklist created with ${checklist.checklist_items.length} items`)

    // Simulate some completed items for demo
    const completedItemIds = checklist.checklist_items.slice(0, 4).map((item: any) => item.id)
    
    for (const itemId of completedItemIds) {
      await supabase
        .from('checklist_items')
        .update({ 
          is_completed: true, 
          completed_at: new Date().toISOString(),
          completed_by: userId
        })
        .eq('id', itemId)
    }

    console.log(`✅ Marked ${completedItemIds.length} items as completed for demo`)

    // Activity logs are created automatically by triggers
    console.log('✅ Activity logs created automatically by database triggers')

    // Get final stats using the stats function
    const { data: finalStats, error: statsError } = await supabase
      .rpc('get_checklist_with_stats', { p_checklist_id: checklistId })
      .single()

    if (statsError) {
      console.log('\n🎉 Sample checklist created successfully!')
      console.log(`📋 Checklist ID: ${checklistId}`)
      console.log(`👤 User ID: ${userId}`)
      console.log(`🔗 Access URL: /dashboard/checklist/${checklistId}`)
      console.log(`📊 Items: ${checklist.checklist_items.length} total, ${completedItemIds.length} completed`)
    } else {
      const stats = finalStats as any
      console.log('\n🎉 Sample checklist created successfully!')
      console.log(`📋 Checklist: ${stats.title}`)
      console.log(`📊 Progress: ${stats.progress_percentage}% (${stats.completed_items}/${stats.total_items} items)`)
      console.log(`👤 User ID: ${userId}`)
      console.log(`🔗 Access URL: /dashboard/checklist/${checklistId}`)
      console.log(`📈 Status: ${stats.status}`)
      
      if (stats.items_by_category) {
        console.log('\n📂 Progress by Category:')
        Object.entries(stats.items_by_category).forEach(([category, data]: [string, any]) => {
          console.log(`  • ${category}: ${data.percentage}% (${data.completed}/${data.total})`)
        })
      }
    }

  } catch (error) {
    console.error('❌ Error creating sample checklist:', error)
  }
}

// Run the script
createSampleChecklist()