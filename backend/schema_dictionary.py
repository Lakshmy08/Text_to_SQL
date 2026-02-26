SCHEMA_DICTIONARY = {

    "table1": {
        "business_name": "companies",
        "primary_key": "id",
        "columns": {
            "id": "company_id",
            "field1": "company_name",
            "field2": "industry",
            "field3": "company_size",
            "field4": "annual_revenue",
            "field5": "website",
            "field6": "headquarters_country",
            "field7": "headquarters_state",
            "field8": "headquarters_city",
            "field9": "founded_year",
            "field10": "status",
            "field11": "acquisition_channel",
            "field12": "sales_rep_id",
            "created_at": "created_at",
            "updated_at": "updated_at"
        }
    },

    "table2": {
        "business_name": "users",
        "primary_key": "id",
        "foreign_keys": {
            "ref1": "table1.id"
        },
        "columns": {
            "id": "user_id",
            "ref1": "company_id",
            "field1": "first_name",
            "field2": "last_name",
            "field3": "email",
            "field4": "job_title",
            "field5": "department",
            "field6": "is_primary_contact",
            "field7": "is_billing_contact",
            "field8": "phone",
            "field9": "timezone",
            "field10": "last_login",
            "field11": "status",
            "created_at": "created_at"
        }
    },

    "table3": {
        "business_name": "products",
        "primary_key": "id",
        "columns": {
            "id": "product_id",
            "field1": "product_name",
            "field2": "product_category",
            "field3": "description",
            "field4": "is_active",
            "field5": "launch_date",
            "created_at": "created_at"
        }
    },

    "table4": {
        "business_name": "plans",
        "primary_key": "id",
        "columns": {
            "id": "plan_id",
            "field1": "plan_name",
            "field2": "plan_tier",
            "field3": "billing_cycle",
            "field4": "base_price",
            "field5": "max_users",
            "field6": "max_storage_gb",
            "field7": "features",
            "field8": "is_active",
            "created_at": "created_at"
        }
    },

    "table5": {
        "business_name": "product_plan_mapping",
        "primary_key": ["ref1", "ref2"],
        "foreign_keys": {
            "ref1": "table3.id",
            "ref2": "table4.id"
        },
        "columns": {
            "ref1": "product_id",
            "ref2": "plan_id",
            "field1": "included_features",
            "field2": "usage_limits"
        }
    },

    "table6": {
        "business_name": "subscriptions",
        "primary_key": "id",
        "foreign_keys": {
            "ref1": "table1.id",
            "ref2": "table4.id"
        },
        "columns": {
            "id": "subscription_id",
            "ref1": "company_id",
            "ref2": "plan_id",
            "field1": "subscription_status",
            "field2": "start_date",
            "field3": "end_date",
            "field4": "trial_end_date",
            "field5": "billing_cycle",
            "field6": "monthly_recurring_revenue",
            "field7": "annual_contract_value",
            "field8": "seats_purchased",
            "field9": "seats_used",
            "field10": "auto_renewal",
            "field11": "cancellation_reason",
            "field12": "cancelled_at",
            "created_at": "created_at",
            "updated_at": "updated_at"
        }
    },

    "table7": {
        "business_name": "transactions",
        "primary_key": "id",
        "foreign_keys": {
            "ref1": "table6.id",
            "ref2": "table1.id"
        },
        "columns": {
            "id": "transaction_id",
            "ref1": "subscription_id",
            "ref2": "company_id",
            "field1": "transaction_type",
            "field2": "amount",
            "field3": "tax_amount",
            "field4": "total_amount",
            "field5": "currency",
            "field6": "transaction_date",
            "field7": "payment_method",
            "field8": "payment_status",
            "field9": "invoice_number",
            "field10": "quarter",
            "field11": "fiscal_year",
            "created_at": "created_at"
        }
    },

    "table8": {
        "business_name": "sales_opportunities",
        "primary_key": "id",
        "foreign_keys": {
            "ref1": "table1.id"
        },
        "columns": {
            "id": "opportunity_id",
            "ref1": "company_id",
            "field1": "opportunity_name",
            "field2": "sales_stage",
            "field3": "lead_source",
            "field4": "expected_revenue",
            "field5": "probability",
            "field6": "expected_close_date",
            "field7": "actual_close_date",
            "field8": "sales_rep_id",
            "field9": "sales_rep_name",
            "field10": "lost_reason",
            "created_at": "created_at",
            "updated_at": "updated_at"
        }
    },

    "table9": {
        "business_name": "marketing_campaigns",
        "primary_key": "id",
        "columns": {
            "id": "campaign_id",
            "field1": "campaign_name",
            "field2": "campaign_type",
            "field3": "channel",
            "field4": "start_date",
            "field5": "end_date",
            "field6": "budget",
            "field7": "spend",
            "field8": "impressions",
            "field9": "clicks",
            "field10": "conversions",
            "field11": "leads_generated",
            "field12": "target_audience",
            "field13": "status",
            "created_at": "created_at"
        }
    },

    "table10": {
        "business_name": "campaign_attribution",
        "primary_key": "id",
        "foreign_keys": {
            "ref1": "table1.id",
            "ref2": "table9.id"
        },
        "columns": {
            "id": "attribution_id",
            "ref1": "company_id",
            "ref2": "campaign_id",
            "field1": "attribution_type",
            "field2": "conversion_date",
            "field3": "revenue_attributed",
            "created_at": "created_at"
        }
    },

    "table11": {
        "business_name": "product_usage_metrics",
        "primary_key": "id",
        "foreign_keys": {
            "ref1": "table1.id",
            "ref2": "table2.id",
            "ref3": "table3.id"
        },
        "columns": {
            "id": "usage_id",
            "ref1": "company_id",
            "ref2": "user_id",
            "ref3": "product_id",
            "field1": "metric_date",
            "field2": "daily_active_users",
            "field3": "monthly_active_users",
            "field4": "feature_usage",
            "field5": "session_duration_minutes",
            "field6": "api_calls",
            "field7": "storage_used_gb",
            "field8": "data_processed_gb",
            "created_at": "created_at"
        }
    },

    "table12": {
        "business_name": "customer_health",
        "primary_key": "id",
        "foreign_keys": {
            "ref1": "table1.id"
        },
        "columns": {
            "id": "health_id",
            "ref1": "company_id",
            "field1": "health_score",
            "field2": "churn_risk",
            "field3": "last_engagement_date",
            "field4": "support_tickets_count",
            "field5": "nps_score",
            "field6": "csm_assigned",
            "field7": "renewal_probability",
            "field8": "expansion_opportunity",
            "field9": "notes",
            "field10": "calculated_at"
        }
    }
}